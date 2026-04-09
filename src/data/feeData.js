import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const FEE_DOC = "feeStructure";
const FEE_ID = "current";

// Default fee structure
const getDefaultFeeData = () => ({
  schoolName: "SPRING FIELD SCHOOL",
  session: "2026-2027",
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

// Fetch fee structure
export const getFeeData = async () => {
  try {
    const docRef = doc(db, FEE_DOC, FEE_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return getDefaultFeeData();
  } catch (e) {
    console.error("Error reading fee data:", e);
    return getDefaultFeeData();
  }
};

// Save fee structure
export const saveFeeData = async (data) => {
  try {
    await setDoc(doc(db, FEE_DOC, FEE_ID), data);
    return true;
  } catch (e) {
    console.error("Error saving fee data:", e);
    return false;
  }
};
