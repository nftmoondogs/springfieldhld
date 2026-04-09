import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, writeBatch } from "firebase/firestore";

const COLLECTION = "bookData";

// Migrate old 'main' doc (single-doc format) to year-based subcollection format
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

      // Write year metadata
      const yearRef = doc(db, COLLECTION, year);
      await setDoc(yearRef, {
        schoolName,
        classOrder: classes.map((c) => c.id),
      });

      // Write each class as a subcollection doc
      const batch = writeBatch(db);
      classes.forEach((cls) => {
        const classRef = doc(db, COLLECTION, year, "classes", cls.id);
        batch.set(classRef, { name: cls.name, books: cls.books || [] });
      });
      await batch.commit();

      // Delete old doc
      await deleteDoc(mainRef);
      console.log(`Migrated 'main' doc to year: ${year}`);
    }

    // Also migrate old year docs that have classes array inline (pre-subcollection format)
    const yearSnap = await getDocs(collection(db, COLLECTION));
    for (const yearDoc of yearSnap.docs) {
      const data = yearDoc.data();
      if (data.classes && Array.isArray(data.classes)) {
        // Old format — has classes inline. Migrate to subcollection.
        const year = yearDoc.id;
        const classes = data.classes;
        const schoolName = data.schoolName || "SPRING FIELD SCHOOL";

        // Write metadata (without classes array)
        await setDoc(doc(db, COLLECTION, year), {
          schoolName,
          classOrder: classes.map((c) => c.id),
        });

        // Write classes to subcollection
        const batch = writeBatch(db);
        classes.forEach((cls) => {
          const classRef = doc(db, COLLECTION, year, "classes", cls.id);
          batch.set(classRef, { name: cls.name, books: cls.books || [] });
        });
        await batch.commit();
        console.log(`Migrated inline classes for year: ${year}`);
      }
    }
  } catch (e) {
    console.error("Migration error:", e);
  }
};

// Get all available years
export const getAvailableYears = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const years = [];
    snapshot.forEach((doc) => years.push(doc.id));
    years.sort((a, b) => b.localeCompare(a));
    return years;
  } catch (e) {
    console.error("Error fetching years:", e);
    return [];
  }
};

// Fetch book data for a specific year (metadata + all classes from subcollection)
export const getBookData = async (year) => {
  if (!year) return null;
  try {
    const yearRef = doc(db, COLLECTION, year);
    const yearSnap = await getDoc(yearRef);
    if (!yearSnap.exists()) return null;

    const meta = yearSnap.data();
    const classOrder = meta.classOrder || [];

    // Fetch all classes from subcollection
    const classesSnap = await getDocs(collection(db, COLLECTION, year, "classes"));
    const classesMap = {};
    classesSnap.forEach((d) => {
      classesMap[d.id] = { id: d.id, ...d.data() };
    });

    // Order classes according to classOrder, append any not in order
    const orderedClasses = [];
    classOrder.forEach((id) => {
      if (classesMap[id]) {
        orderedClasses.push(classesMap[id]);
        delete classesMap[id];
      }
    });
    // Append remaining classes not in classOrder
    Object.values(classesMap).forEach((c) => orderedClasses.push(c));

    return {
      year,
      schoolName: meta.schoolName || "SPRING FIELD SCHOOL",
      classes: orderedClasses,
    };
  } catch (e) {
    console.error("Error reading book data:", e);
    return null;
  }
};

// Save book data — writes metadata + each class as separate doc
export const saveBookData = async (year, data) => {
  try {
    const yearRef = doc(db, COLLECTION, year);

    // Write year metadata (schoolName + class order)
    await setDoc(yearRef, {
      schoolName: data.schoolName,
      classOrder: data.classes.map((c) => c.id),
    });

    // Delete old classes that no longer exist
    const existingSnap = await getDocs(collection(db, COLLECTION, year, "classes"));
    const currentIds = new Set(data.classes.map((c) => c.id));
    const batch = writeBatch(db);
    existingSnap.forEach((d) => {
      if (!currentIds.has(d.id)) {
        batch.delete(d.ref);
      }
    });
    await batch.commit();

    // Write each class individually
    for (const cls of data.classes) {
      const classRef = doc(db, COLLECTION, year, "classes", cls.id);
      await setDoc(classRef, {
        name: cls.name,
        books: cls.books || [],
      });
    }

    return true;
  } catch (e) {
    console.error("Error saving book data:", e);
    return false;
  }
};

// Create a new year with default classes
export const createYear = async (year, schoolName = "SPRING FIELD SCHOOL") => {
  try {
    const yearRef = doc(db, COLLECTION, year);
    const existing = await getDoc(yearRef);
    if (existing.exists()) return false;

    const defaultClass = { id: "nursery", name: "NURSERY" };

    await setDoc(yearRef, {
      schoolName,
      classOrder: [defaultClass.id],
    });

    await setDoc(doc(db, COLLECTION, year, "classes", defaultClass.id), {
      name: defaultClass.name,
      books: [
        { id: 1, name: "", price: 0, frontImage: "", backImage: "" },
      ],
    });

    return true;
  } catch (e) {
    console.error("Error creating year:", e);
    return false;
  }
};

// Delete a year and all its class subcollection docs
export const deleteYear = async (year) => {
  try {
    // Delete all class docs first
    const classesSnap = await getDocs(collection(db, COLLECTION, year, "classes"));
    const batch = writeBatch(db);
    classesSnap.forEach((d) => batch.delete(d.ref));
    await batch.commit();

    // Delete year doc
    await deleteDoc(doc(db, COLLECTION, year));
    return true;
  } catch (e) {
    console.error("Error deleting year:", e);
    return false;
  }
};

// Compress and convert image file to base64 (auto-compresses to under ~300KB)
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_SIZE = 300 * 1024; // 300KB target (to stay well under 1MB per class doc)
      let { width, height } = img;

      // Scale down large images (max 900px on longest side)
      const MAX_DIM = 900;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Try progressively lower quality until under target size
      let quality = 0.7;
      let result = canvas.toDataURL("image/jpeg", quality);

      while (result.length > MAX_SIZE && quality > 0.1) {
        quality -= 0.1;
        result = canvas.toDataURL("image/jpeg", quality);
      }

      // If still too large, scale down further
      if (result.length > MAX_SIZE) {
        const scale = 0.5;
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        result = canvas.toDataURL("image/jpeg", 0.5);
      }

      resolve(result);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
};

export const getClassTotal = (books) => {
  return books.reduce((sum, book) => sum + (parseFloat(book.price) || 0), 0);
};

export const generateBookId = (books) => {
  if (!books || books.length === 0) return 1;
  return Math.max(...books.map((b) => b.id)) + 1;
};

export const generateClassId = (classes) => {
  return `class_${Date.now()}`;
};
