import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

const COLLECTION = "feeStructure";

const getDefaultFeeData = () => ({
  schoolName: "SPRING FIELD SCHOOL",
  classes: ["NURSERY", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
  feeCategories: [
    { id: "admission", name: "Admission Fee", fees: {} },
    { id: "tuition", name: "Tuition Fee (Monthly)", fees: {} },
    { id: "annual", name: "Annual Charges", fees: {} },
    { id: "exam", name: "Exam Fee", fees: {} },
    { id: "computer", name: "Computer Fee", fees: {} },
  ],
  notes: "",
});

// Migrate old single-doc format to year-based
export const migrateFeeData = async () => {
  try {
    const oldRef = doc(db, COLLECTION, "current");
    const oldSnap = await getDoc(oldRef);
    if (oldSnap.exists()) {
      const data = oldSnap.data();
      const year = data.session || "2026-2027";
      const { session, ...rest } = data;
      await setDoc(doc(db, COLLECTION, year), rest);
      await deleteDoc(oldRef);
      console.log(`Migrated fee data to year: ${year}`);
    }
  } catch (e) {
    console.error("Fee migration error:", e);
  }
};

// Get all available fee years
export const getFeeYears = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const years = [];
    snapshot.forEach((d) => years.push(d.id));
    years.sort((a, b) => b.localeCompare(a));
    return years;
  } catch (e) {
    console.error("Error fetching fee years:", e);
    return [];
  }
};

// Fetch fee data for a specific year
export const getFeeData = async (year) => {
  if (!year) return null;
  try {
    const docSnap = await getDoc(doc(db, COLLECTION, year));
    if (docSnap.exists()) return { year, ...docSnap.data() };
    return null;
  } catch (e) {
    console.error("Error reading fee data:", e);
    return null;
  }
};

// Save fee data for a year
export const saveFeeData = async (year, data) => {
  try {
    const { year: _, ...rest } = data;
    await setDoc(doc(db, COLLECTION, year), rest);
    return true;
  } catch (e) {
    console.error("Error saving fee data:", e);
    return false;
  }
};

// Create a new fee year
export const createFeeYear = async (year, schoolName = "SPRING FIELD SCHOOL") => {
  try {
    const existing = await getDoc(doc(db, COLLECTION, year));
    if (existing.exists()) return false;
    const defaults = getDefaultFeeData();
    defaults.schoolName = schoolName;
    await setDoc(doc(db, COLLECTION, year), defaults);
    return true;
  } catch (e) {
    console.error("Error creating fee year:", e);
    return false;
  }
};

// Delete a fee year
export const deleteFeeYear = async (year) => {
  try {
    await deleteDoc(doc(db, COLLECTION, year));
    return true;
  } catch (e) {
    console.error("Error deleting fee year:", e);
    return false;
  }
};
