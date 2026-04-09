import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

const COLLECTION = "bookData";

// Migrate old 'main' doc to year-based format (runs once)
export const migrateOldData = async () => {
  try {
    const mainRef = doc(db, COLLECTION, "main");
    const mainSnap = await getDoc(mainRef);
    if (mainSnap.exists()) {
      const data = mainSnap.data();
      const year = data.year || "2026-2027";
      const { year: _, ...dataWithoutYear } = data;
      // Copy to year-based doc
      const yearRef = doc(db, COLLECTION, year);
      await setDoc(yearRef, dataWithoutYear);
      // Delete old main doc
      await deleteDoc(mainRef);
      console.log(`Migrated old data to year: ${year}`);
    }
  } catch (e) {
    console.error("Migration error:", e);
  }
};

const getDefaultClasses = () => [
  {
    id: "nursery",
    name: "NURSERY",
    books: [
      { id: 1, name: "NUMBERS 1-20", price: 185, frontImage: "", backImage: "" },
      { id: 2, name: "HINDI WORKBOOK 1 AKSHAR", price: 130, frontImage: "", backImage: "" },
      { id: 3, name: "MATHS WRITE 1-20", price: 185, frontImage: "", backImage: "" },
      { id: 4, name: "ENGLISH ALPHABETS", price: 275, frontImage: "", backImage: "" },
      { id: 5, name: "DRAWING A", price: 195, frontImage: "", backImage: "" },
    ],
  },
];

// Get all available years from Firestore
export const getAvailableYears = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const years = [];
    snapshot.forEach((doc) => {
      years.push(doc.id);
    });
    // Sort descending (newest first)
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
    const docRef = doc(db, COLLECTION, year);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { year, ...docSnap.data() };
    }
  } catch (e) {
    console.error("Error reading book data:", e);
  }
  return null;
};

// Save book data for a specific year
export const saveBookData = async (year, data) => {
  try {
    const docRef = doc(db, COLLECTION, year);
    const { year: _, ...dataWithoutYear } = data;
    await setDoc(docRef, dataWithoutYear);
    return true;
  } catch (e) {
    console.error("Error saving book data:", e);
    return false;
  }
};

// Create a new year with default or empty data
export const createYear = async (year, schoolName = "SPRING FIELD SCHOOL") => {
  try {
    const docRef = doc(db, COLLECTION, year);
    const existing = await getDoc(docRef);
    if (existing.exists()) return false; // Already exists
    await setDoc(docRef, {
      schoolName,
      classes: getDefaultClasses(),
    });
    return true;
  } catch (e) {
    console.error("Error creating year:", e);
    return false;
  }
};

// Delete a year
export const deleteYear = async (year) => {
  try {
    await deleteDoc(doc(db, COLLECTION, year));
    return true;
  } catch (e) {
    console.error("Error deleting year:", e);
    return false;
  }
};

// Convert file to base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
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
