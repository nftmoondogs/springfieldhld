import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, writeBatch } from "firebase/firestore";

const COLLECTION = "bookData";

// Migrate old formats to the new subcollection + separate images format
export const migrateOldData = async () => {
  try {
    // Check for old 'main' doc
    const mainRef = doc(db, COLLECTION, "main");
    const mainSnap = await getDoc(mainRef);
    if (mainSnap.exists()) {
      const data = mainSnap.data();
      const year = data.year || "2026-2027";
      const classes = data.classes || [];
      const schoolName = data.schoolName || "SPRING FIELD SCHOOL";
      await migrateClassesForYear(year, schoolName, classes);
      await deleteDoc(mainRef);
      console.log(`Migrated 'main' doc to year: ${year}`);
    }

    // Migrate old year docs that have classes inline
    const yearSnap = await getDocs(collection(db, COLLECTION));
    for (const yearDoc of yearSnap.docs) {
      if (yearDoc.id === "main") continue;
      const data = yearDoc.data();
      if (data.classes && Array.isArray(data.classes)) {
        await migrateClassesForYear(yearDoc.id, data.schoolName || "SPRING FIELD SCHOOL", data.classes);
        console.log(`Migrated inline classes for year: ${yearDoc.id}`);
      }
    }

    // Migrate class docs that still have images inline in books
    const allYears = await getDocs(collection(db, COLLECTION));
    for (const yearDoc of allYears.docs) {
      const data = yearDoc.data();
      if (data.classOrder) {
        const classesSnap = await getDocs(collection(db, COLLECTION, yearDoc.id, "classes"));
        for (const classDoc of classesSnap.docs) {
          const classData = classDoc.data();
          const books = classData.books || [];
          let hasInlineImages = false;
          for (const book of books) {
            if ((book.frontImage && book.frontImage.length > 100) ||
              (book.backImage && book.backImage.length > 100)) {
              hasInlineImages = true;
              break;
            }
          }
          if (hasInlineImages) {
            // Extract images to separate docs, strip from books
            const strippedBooks = [];
            for (const book of books) {
              if (book.frontImage && book.frontImage.length > 100) {
                const imgRef = doc(db, COLLECTION, yearDoc.id, "images", `${classDoc.id}_${book.id}_front`);
                await setDoc(imgRef, { data: book.frontImage });
              }
              if (book.backImage && book.backImage.length > 100) {
                const imgRef = doc(db, COLLECTION, yearDoc.id, "images", `${classDoc.id}_${book.id}_back`);
                await setDoc(imgRef, { data: book.backImage });
              }
              strippedBooks.push({
                ...book,
                frontImage: book.frontImage ? "ref" : "",
                backImage: book.backImage ? "ref" : "",
              });
            }
            await setDoc(classDoc.ref, { name: classData.name, books: strippedBooks });
            console.log(`Migrated images for class ${classDoc.id} in year ${yearDoc.id}`);
          }
        }
      }
    }
  } catch (e) {
    console.error("Migration error:", e);
  }
};

// Helper: migrate classes for a year
const migrateClassesForYear = async (year, schoolName, classes) => {
  const yearRef = doc(db, COLLECTION, year);
  await setDoc(yearRef, { schoolName, classOrder: classes.map((c) => c.id) });

  for (const cls of classes) {
    const books = cls.books || [];
    const strippedBooks = [];

    for (const book of books) {
      if (book.frontImage && book.frontImage.length > 100) {
        const imgRef = doc(db, COLLECTION, year, "images", `${cls.id}_${book.id}_front`);
        await setDoc(imgRef, { data: book.frontImage });
      }
      if (book.backImage && book.backImage.length > 100) {
        const imgRef = doc(db, COLLECTION, year, "images", `${cls.id}_${book.id}_back`);
        await setDoc(imgRef, { data: book.backImage });
      }
      strippedBooks.push({
        ...book,
        frontImage: book.frontImage ? "ref" : "",
        backImage: book.backImage ? "ref" : "",
      });
    }

    const classRef = doc(db, COLLECTION, year, "classes", cls.id);
    await setDoc(classRef, { name: cls.name, books: strippedBooks });
  }
};

// Get all available years
export const getAvailableYears = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const years = [];
    snapshot.forEach((d) => years.push(d.id));
    years.sort((a, b) => b.localeCompare(a));
    return years;
  } catch (e) {
    console.error("Error fetching years:", e);
    return [];
  }
};

// Fetch book data for a specific year
export const getBookData = async (year) => {
  if (!year) return null;
  try {
    const yearRef = doc(db, COLLECTION, year);
    const yearSnap = await getDoc(yearRef);
    if (!yearSnap.exists()) return null;

    const meta = yearSnap.data();
    const classOrder = meta.classOrder || [];

    // Fetch all classes
    const classesSnap = await getDocs(collection(db, COLLECTION, year, "classes"));
    const classesMap = {};
    classesSnap.forEach((d) => { classesMap[d.id] = { id: d.id, ...d.data() }; });

    // Fetch all images
    const imagesSnap = await getDocs(collection(db, COLLECTION, year, "images"));
    const imagesMap = {};
    imagesSnap.forEach((d) => { imagesMap[d.id] = d.data().data; });

    // Merge images into books
    Object.values(classesMap).forEach((cls) => {
      cls.books = (cls.books || []).map((book) => ({
        ...book,
        frontImage: imagesMap[`${cls.id}_${book.id}_front`] || (book.frontImage === "ref" ? "" : book.frontImage || ""),
        backImage: imagesMap[`${cls.id}_${book.id}_back`] || (book.backImage === "ref" ? "" : book.backImage || ""),
      }));
    });

    // Order classes
    const orderedClasses = [];
    classOrder.forEach((id) => {
      if (classesMap[id]) { orderedClasses.push(classesMap[id]); delete classesMap[id]; }
    });
    Object.values(classesMap).forEach((c) => orderedClasses.push(c));

    return { year, schoolName: meta.schoolName || "SPRING FIELD SCHOOL", classes: orderedClasses };
  } catch (e) {
    console.error("Error reading book data:", e);
    return null;
  }
};

// Save book data — class metadata (no images) + images as separate docs
export const saveBookData = async (year, data) => {
  try {
    // 1. Write year metadata
    await setDoc(doc(db, COLLECTION, year), {
      schoolName: data.schoolName,
      classOrder: data.classes.map((c) => c.id),
    });

    // 2. Get existing class + image docs for cleanup
    const existingClasses = await getDocs(collection(db, COLLECTION, year, "classes"));
    const existingImages = await getDocs(collection(db, COLLECTION, year, "images"));

    const currentClassIds = new Set(data.classes.map((c) => c.id));
    const newImageIds = new Set();

    // 3. Write each class (books WITHOUT image data) + images separately
    for (const cls of data.classes) {
      const strippedBooks = [];

      for (const book of cls.books) {
        // Save front image
        if (book.frontImage && book.frontImage.length > 100) {
          const imgId = `${cls.id}_${book.id}_front`;
          newImageIds.add(imgId);
          await setDoc(doc(db, COLLECTION, year, "images", imgId), { data: book.frontImage });
        }

        // Save back image
        if (book.backImage && book.backImage.length > 100) {
          const imgId = `${cls.id}_${book.id}_back`;
          newImageIds.add(imgId);
          await setDoc(doc(db, COLLECTION, year, "images", imgId), { data: book.backImage });
        }

        strippedBooks.push({
          id: book.id,
          name: book.name,
          price: book.price,
          frontImage: book.frontImage ? "ref" : "",
          backImage: book.backImage ? "ref" : "",
        });
      }

      await setDoc(doc(db, COLLECTION, year, "classes", cls.id), {
        name: cls.name,
        books: strippedBooks,
      });
    }

    // 4. Delete removed classes and orphaned images
    const batch = writeBatch(db);
    existingClasses.forEach((d) => {
      if (!currentClassIds.has(d.id)) batch.delete(d.ref);
    });
    existingImages.forEach((d) => {
      // Delete images for deleted classes or removed books
      const classId = d.id.split("_")[0];
      if (!currentClassIds.has(classId) || !newImageIds.has(d.id)) {
        // Only delete if this class's book no longer has this image
        // Keep existing images that weren't re-uploaded (they won't be in newImageIds)
      }
    });
    // Delete classes that were removed
    existingClasses.forEach((d) => {
      if (!currentClassIds.has(d.id)) batch.delete(d.ref);
    });
    await batch.commit();

    return true;
  } catch (e) {
    console.error("Error saving book data:", e);
    return false;
  }
};

// Create a new year
export const createYear = async (year, schoolName = "SPRING FIELD SCHOOL") => {
  try {
    const yearRef = doc(db, COLLECTION, year);
    const existing = await getDoc(yearRef);
    if (existing.exists()) return false;

    await setDoc(yearRef, { schoolName, classOrder: ["nursery"] });
    await setDoc(doc(db, COLLECTION, year, "classes", "nursery"), {
      name: "NURSERY",
      books: [{ id: 1, name: "", price: 0, frontImage: "", backImage: "" }],
    });

    return true;
  } catch (e) {
    console.error("Error creating year:", e);
    return false;
  }
};

// Delete a year and all subcollection docs
export const deleteYear = async (year) => {
  try {
    const classesSnap = await getDocs(collection(db, COLLECTION, year, "classes"));
    const imagesSnap = await getDocs(collection(db, COLLECTION, year, "images"));
    const batch = writeBatch(db);
    classesSnap.forEach((d) => batch.delete(d.ref));
    imagesSnap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    await deleteDoc(doc(db, COLLECTION, year));
    return true;
  } catch (e) {
    console.error("Error deleting year:", e);
    return false;
  }
};

// Compress and convert image file to base64 (~200KB target)
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_SIZE = 200 * 1024; // 200KB target
      let { width, height } = img;

      const MAX_DIM = 800;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.7;
      let result = canvas.toDataURL("image/jpeg", quality);

      while (result.length > MAX_SIZE && quality > 0.1) {
        quality -= 0.1;
        result = canvas.toDataURL("image/jpeg", quality);
      }

      if (result.length > MAX_SIZE) {
        canvas.width = Math.round(width * 0.5);
        canvas.height = Math.round(height * 0.5);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        result = canvas.toDataURL("image/jpeg", 0.5);
      }

      resolve(result);
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
};

export const getClassTotal = (books) =>
  books.reduce((sum, book) => sum + (parseFloat(book.price) || 0), 0);

export const generateBookId = (books) => {
  if (!books || books.length === 0) return 1;
  return Math.max(...books.map((b) => b.id)) + 1;
};

export const generateClassId = () => `class_${Date.now()}`;
