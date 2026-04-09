import { db, storage } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const DOC_ID = "main";
const COLLECTION = "bookData";

const getDefaultBookData = () => ({
  schoolName: "SPRING FIELD SCHOOL",
  year: "2023-2024",
  classes: [
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
    {
      id: "lkg",
      name: "LKG",
      books: [
        { id: 1, name: "BAGH O BAHAR A", price: 155, frontImage: "", backImage: "" },
        { id: 2, name: "RHYMES BALGEET B", price: 130, frontImage: "", backImage: "" },
        { id: 3, name: "PICTURE BOOK A", price: 190, frontImage: "", backImage: "" },
        { id: 4, name: "ACTIVITY BOOK CAPITAL WRITING", price: 250, frontImage: "", backImage: "" },
        { id: 5, name: "MERI AKSHAR RACHNA ABHYAS", price: 250, frontImage: "", backImage: "" },
      ],
    },
    {
      id: "ukg",
      name: "UKG",
      books: [
        { id: 1, name: "SAMPLE BOOK 1", price: 200, frontImage: "", backImage: "" },
        { id: 2, name: "SAMPLE BOOK 2", price: 150, frontImage: "", backImage: "" },
      ],
    },
  ],
});

// Fetch book data from Firestore
export const getBookData = async () => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error reading book data from Firestore:", e);
  }
  // Return default and save it
  const defaultData = getDefaultBookData();
  await saveBookData(defaultData);
  return defaultData;
};

// Save book data to Firestore
export const saveBookData = async (data) => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, data);
    return true;
  } catch (e) {
    console.error("Error saving book data to Firestore:", e);
    return false;
  }
};

// Upload image to Firebase Storage, returns download URL
export const uploadBookImage = async (file, classId, bookId, imageType) => {
  try {
    const path = `book-images/${classId}/${bookId}_${imageType}_${Date.now()}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (e) {
    console.error("Error uploading image:", e);
    return null;
  }
};

// Delete image from Firebase Storage
export const deleteBookImage = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("firebase")) return;
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (e) {
    // Image might already be deleted, ignore
    console.warn("Could not delete image:", e);
  }
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
