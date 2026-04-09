const STORAGE_KEY = "springfield_book_data";

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

export const getBookData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading book data:", e);
  }
  // Return default and save it
  const defaultData = getDefaultBookData();
  saveBookData(defaultData);
  return defaultData;
};

export const saveBookData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Error saving book data:", e);
    return false;
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
