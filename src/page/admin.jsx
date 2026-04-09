import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Footer from "../component/layout/footer";
import {
  getBookData,
  saveBookData,
  getAvailableYears,
  createYear,
  deleteYear,
  migrateOldData,
  fileToBase64,
  getClassTotal,
  generateBookId,
  generateClassId,
} from "../data/bookData";

const ADMIN_PASSWORD = "Suzain@1918";

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Multi-year state
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [newYear, setNewYear] = useState("");
  const [showNewYearInput, setShowNewYearInput] = useState(false);

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRefs = useRef({});

  // Fetch available years on login
  useEffect(() => {
    if (!authenticated) return;
    const fetchYears = async () => {
      setLoading(true);
      await migrateOldData(); // migrate legacy 'main' doc if it exists
      const availableYears = await getAvailableYears();
      setYears(availableYears);
      if (availableYears.length > 0) {
        setSelectedYear(availableYears[0]);
      }
      setLoading(false);
    };
    fetchYears();
  }, [authenticated]);

  // Fetch data when year changes
  useEffect(() => {
    if (!selectedYear || !authenticated) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await getBookData(selectedYear);
      setBookData(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedYear, authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
    setPassword("");
  };

  const showToastMsg = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSave = async () => {
    if (!selectedYear || !bookData) return;
    setSaving(true);
    const success = await saveBookData(selectedYear, bookData);
    setSaving(false);
    showToastMsg(success ? "✅ Changes saved!" : "❌ Error saving.");
  };

  const handleCreateYear = async () => {
    const yearStr = newYear.trim();
    if (!yearStr) return;
    if (years.includes(yearStr)) {
      showToastMsg("❌ This year already exists.");
      return;
    }
    const success = await createYear(yearStr, bookData?.schoolName || "SPRING FIELD SCHOOL");
    if (success) {
      const updatedYears = [yearStr, ...years].sort((a, b) => b.localeCompare(a));
      setYears(updatedYears);
      setSelectedYear(yearStr);
      setNewYear("");
      setShowNewYearInput(false);
      showToastMsg("✅ Year created!");
    } else {
      showToastMsg("❌ Failed to create year.");
    }
  };

  const handleDeleteYear = async () => {
    if (!selectedYear) return;
    if (!window.confirm(`Delete the book list for "${selectedYear}"? This cannot be undone.`)) return;
    const success = await deleteYear(selectedYear);
    if (success) {
      const updatedYears = years.filter((y) => y !== selectedYear);
      setYears(updatedYears);
      setSelectedYear(updatedYears.length > 0 ? updatedYears[0] : "");
      setBookData(null);
      showToastMsg("✅ Year deleted.");
    } else {
      showToastMsg("❌ Failed to delete.");
    }
  };

  const updateSchoolName = (value) => setBookData((prev) => ({ ...prev, schoolName: value }));

  const updateClassName = (classIndex, value) => {
    setBookData((prev) => {
      const newClasses = [...prev.classes];
      newClasses[classIndex] = { ...newClasses[classIndex], name: value };
      return { ...prev, classes: newClasses };
    });
  };

  const addClass = () => {
    setBookData((prev) => ({
      ...prev,
      classes: [...prev.classes, { id: generateClassId(prev.classes), name: "NEW CLASS", books: [] }],
    }));
  };

  const removeClass = (classIndex) => {
    if (!window.confirm("Delete this class and all its books?")) return;
    setBookData((prev) => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== classIndex),
    }));
  };

  const updateBook = (classIndex, bookIndex, field, value) => {
    setBookData((prev) => {
      const newClasses = [...prev.classes];
      const newBooks = [...newClasses[classIndex].books];
      newBooks[bookIndex] = { ...newBooks[bookIndex], [field]: value };
      newClasses[classIndex] = { ...newClasses[classIndex], books: newBooks };
      return { ...prev, classes: newClasses };
    });
  };

  const addBook = (classIndex) => {
    setBookData((prev) => {
      const newClasses = [...prev.classes];
      const cls = newClasses[classIndex];
      const newBooks = [...cls.books, { id: generateBookId(cls.books), name: "", price: 0, frontImage: "", backImage: "" }];
      newClasses[classIndex] = { ...cls, books: newBooks };
      return { ...prev, classes: newClasses };
    });
  };

  const removeBook = (classIndex, bookIndex) => {
    setBookData((prev) => {
      const newClasses = [...prev.classes];
      const newBooks = newClasses[classIndex].books.filter((_, i) => i !== bookIndex);
      newClasses[classIndex] = { ...newClasses[classIndex], books: newBooks };
      return { ...prev, classes: newClasses };
    });
  };

  const handleImageUpload = useCallback(async (classIndex, bookIndex, field, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      updateBook(classIndex, bookIndex, field, base64);
    } catch (err) {
      console.error("Image conversion error:", err);
      alert("Failed to process image.");
    }
  }, []);

  const triggerFileInput = (key) => {
    if (fileInputRefs.current[key]) fileInputRefs.current[key].click();
  };

  // Login Screen
  if (!authenticated) {
    return (
      <Fragment>
        <Header />
        <PageHeader title="Admin Panel" curPage="Admin" />
        <div className="tw-min-h-[60vh] tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-16">
          <div className="tw-w-full tw-max-w-md tw-mx-4">
            <div className="tw-bg-white tw-rounded-2xl tw-shadow-xl tw-shadow-slate-200/50 tw-border tw-border-slate-200/60 tw-p-8 md:tw-p-10">
              <div className="tw-text-center tw-mb-8">
                <div className="tw-w-16 tw-h-16 tw-bg-gradient-to-br tw-from-slate-800 tw-to-slate-900 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
                  <span className="tw-text-2xl">🔐</span>
                </div>
                <h3 className="tw-text-2xl tw-font-extrabold tw-text-slate-800">Admin Login</h3>
                <p className="tw-text-slate-500 tw-text-sm tw-mt-1">Enter password to manage book lists</p>
              </div>
              <form onSubmit={handleLogin}>
                <div className="tw-mb-5">
                  <label className="tw-block tw-text-sm tw-font-semibold tw-text-slate-600 tw-mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="tw-w-full tw-px-4 tw-py-3 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-base tw-outline-none focus:tw-border-amber-500 tw-transition-colors"
                    autoFocus
                  />
                  {error && <p className="tw-mt-2 tw-text-red-500 tw-text-sm tw-font-semibold">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="tw-w-full tw-py-3.5 tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-text-white tw-rounded-xl tw-font-bold tw-text-base tw-uppercase tw-tracking-wider hover:tw-from-slate-700 hover:tw-to-slate-800 tw-transition-all tw-duration-200 active:tw-scale-[0.98]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }

  // Loading
  if (loading && years.length === 0) {
    return (
      <Fragment>
        <Header />
        <PageHeader title="Admin Panel" curPage="Admin" />
        <div className="tw-min-h-[60vh] tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100">
          <div className="tw-text-center">
            <div className="tw-w-12 tw-h-12 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin tw-mx-auto tw-mb-4"></div>
            <p className="tw-text-slate-500 tw-font-medium tw-text-lg">Loading...</p>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }

  // Admin Dashboard
  return (
    <Fragment>
      <Header />
      <PageHeader title="Admin Panel" curPage="Admin" />
      <div className="tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-8 tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-min-h-[80vh]">
        <div className="tw-max-w-7xl tw-mx-auto">
          {/* Top Bar */}
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-mb-6">
            <h3 className="tw-text-2xl tw-font-extrabold tw-text-slate-800 tw-flex tw-items-center tw-gap-2">
              📚 Book List Manager
            </h3>
            <div className="tw-flex tw-flex-wrap tw-gap-3">
              <button
                onClick={handleSave}
                disabled={saving || !selectedYear}
                className="tw-px-5 tw-py-2.5 tw-bg-emerald-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm hover:tw-bg-emerald-600 tw-transition-colors disabled:tw-opacity-60 disabled:tw-cursor-not-allowed tw-shadow-sm"
              >
                {saving ? "⏳ Saving..." : "💾 Save All Changes"}
              </button>
              <button
                onClick={handleLogout}
                className="tw-px-5 tw-py-2.5 tw-bg-white tw-text-slate-600 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-font-bold tw-text-sm hover:tw-border-slate-400 tw-transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Year Selector */}
          <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-6 tw-mb-6">
            <h4 className="tw-text-base tw-font-bold tw-text-slate-700 tw-mb-4 tw-flex tw-items-center tw-gap-2">
              📅 Academic Year
            </h4>
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-3">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`tw-px-5 tw-py-2.5 tw-rounded-xl tw-font-bold tw-text-sm tw-transition-all tw-duration-200 tw-border-2 ${
                    selectedYear === year
                      ? "tw-bg-amber-500 tw-text-white tw-border-amber-500 tw-shadow-lg tw-shadow-amber-500/25"
                      : "tw-bg-white tw-text-slate-600 tw-border-slate-200 hover:tw-border-amber-400 hover:tw-text-amber-600"
                  }`}
                >
                  {year}
                </button>
              ))}

              {/* New Year Button / Input */}
              {showNewYearInput ? (
                <div className="tw-flex tw-items-center tw-gap-2">
                  <input
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="e.g. 2025-2026"
                    className="tw-px-4 tw-py-2 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-sm tw-outline-none focus:tw-border-amber-500 tw-w-40"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleCreateYear()}
                  />
                  <button
                    onClick={handleCreateYear}
                    className="tw-px-4 tw-py-2 tw-bg-emerald-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm hover:tw-bg-emerald-600 tw-transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => { setShowNewYearInput(false); setNewYear(""); }}
                    className="tw-px-3 tw-py-2 tw-text-slate-400 hover:tw-text-slate-600 tw-text-sm tw-font-bold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewYearInput(true)}
                  className="tw-px-5 tw-py-2.5 tw-rounded-xl tw-font-bold tw-text-sm tw-border-2 tw-border-dashed tw-border-slate-300 tw-text-slate-400 hover:tw-border-amber-400 hover:tw-text-amber-600 tw-transition-colors"
                >
                  + New Year
                </button>
              )}

              {/* Delete current year */}
              {selectedYear && (
                <button
                  onClick={handleDeleteYear}
                  className="tw-px-4 tw-py-2.5 tw-rounded-xl tw-font-bold tw-text-xs tw-bg-red-50 tw-text-red-500 tw-border tw-border-red-200 hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors tw-ml-auto"
                >
                  🗑️ Delete {selectedYear}
                </button>
              )}
            </div>
          </div>

          {/* No year selected / no data */}
          {!selectedYear || !bookData ? (
            <div className="tw-text-center tw-py-20">
              <p className="tw-text-slate-400 tw-text-lg tw-font-medium">
                {!selectedYear ? 'Create a year to get started.' : 'Loading...'}
              </p>
            </div>
          ) : (
            <>
              {/* School Info */}
              <div className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-6 tw-mb-6">
                <h4 className="tw-text-base tw-font-bold tw-text-slate-700 tw-mb-4 tw-flex tw-items-center tw-gap-2">
                  🏫 School Information
                </h4>
                <div>
                  <label className="tw-block tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-mb-1.5">School Name</label>
                  <input
                    type="text"
                    value={bookData.schoolName}
                    onChange={(e) => updateSchoolName(e.target.value)}
                    className="tw-w-full tw-max-w-md tw-px-4 tw-py-2.5 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-sm tw-font-medium tw-outline-none focus:tw-border-amber-500 tw-transition-colors"
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <p className="tw-text-slate-500 tw-text-sm tw-font-medium">
                  Editing: <span className="tw-font-bold tw-text-amber-600">{selectedYear}</span> · {bookData.classes.length} classes
                </p>
                <button
                  onClick={addClass}
                  className="tw-px-5 tw-py-2.5 tw-bg-amber-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm hover:tw-bg-amber-600 tw-transition-colors tw-shadow-sm"
                >
                  + Add Class
                </button>
              </div>

              {/* Class Sections */}
              {bookData.classes.map((cls, classIndex) => (
                <div key={cls.id} className="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-overflow-hidden tw-mb-6">
                  {/* Class Header */}
                  <div className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-6 tw-py-4 tw-flex tw-items-center tw-justify-between">
                    <input
                      type="text"
                      value={cls.name}
                      onChange={(e) => updateClassName(classIndex, e.target.value)}
                      placeholder="Class Name"
                      className="tw-bg-white/10 tw-border tw-border-white/20 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-lg tw-font-bold tw-uppercase tw-tracking-wider tw-outline-none focus:tw-border-amber-400 tw-w-56 placeholder:tw-text-white/40"
                    />
                    <button
                      onClick={() => removeClass(classIndex)}
                      className="tw-px-4 tw-py-2 tw-bg-red-500/80 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs hover:tw-bg-red-500 tw-transition-colors"
                    >
                      Delete Class
                    </button>
                  </div>

                  {/* Books Table */}
                  <div className="tw-p-5 tw-overflow-x-auto">
                    <table className="tw-w-full tw-text-sm">
                      <thead>
                        <tr className="tw-border-b-2 tw-border-slate-200">
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-w-10">#</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Front Image</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Back Image</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-left tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Book Name</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-left tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-w-24">Price (₹)</th>
                          <th className="tw-px-3 tw-py-2.5 tw-w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="tw-divide-y tw-divide-slate-100">
                        {cls.books.map((book, bookIndex) => (
                          <tr key={book.id} className="hover:tw-bg-slate-50/50">
                            <td className="tw-px-3 tw-py-3 tw-text-center tw-font-bold tw-text-slate-400">{bookIndex + 1}</td>
                            {/* Front Image */}
                            <td className="tw-px-3 tw-py-3">
                              <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                {book.frontImage && (
                                  <div className="tw-relative tw-group">
                                    <img src={book.frontImage} alt="Front" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200" />
                                    <button
                                      onClick={() => updateBook(classIndex, bookIndex, "frontImage", "")}
                                      className="tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity"
                                    >✕</button>
                                  </div>
                                )}
                                <input type="file" accept="image/*" className="tw-hidden"
                                  ref={(el) => (fileInputRefs.current[`front_${classIndex}_${bookIndex}`] = el)}
                                  onChange={(e) => handleImageUpload(classIndex, bookIndex, "frontImage", e.target.files[0])}
                                />
                                <button
                                  onClick={() => triggerFileInput(`front_${classIndex}_${bookIndex}`)}
                                  className="tw-text-xs tw-px-3 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-md tw-text-slate-500 hover:tw-bg-slate-200 tw-transition-colors tw-whitespace-nowrap"
                                >📷 Upload</button>
                              </div>
                            </td>
                            {/* Back Image */}
                            <td className="tw-px-3 tw-py-3">
                              <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                {book.backImage && (
                                  <div className="tw-relative tw-group">
                                    <img src={book.backImage} alt="Back" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200" />
                                    <button
                                      onClick={() => updateBook(classIndex, bookIndex, "backImage", "")}
                                      className="tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity"
                                    >✕</button>
                                  </div>
                                )}
                                <input type="file" accept="image/*" className="tw-hidden"
                                  ref={(el) => (fileInputRefs.current[`back_${classIndex}_${bookIndex}`] = el)}
                                  onChange={(e) => handleImageUpload(classIndex, bookIndex, "backImage", e.target.files[0])}
                                />
                                <button
                                  onClick={() => triggerFileInput(`back_${classIndex}_${bookIndex}`)}
                                  className="tw-text-xs tw-px-3 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-md tw-text-slate-500 hover:tw-bg-slate-200 tw-transition-colors tw-whitespace-nowrap"
                                >📷 Upload</button>
                              </div>
                            </td>
                            {/* Book Name */}
                            <td className="tw-px-3 tw-py-3">
                              <input type="text" value={book.name}
                                onChange={(e) => updateBook(classIndex, bookIndex, "name", e.target.value)}
                                placeholder="Book Name"
                                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500 tw-transition-colors"
                              />
                            </td>
                            {/* Price */}
                            <td className="tw-px-3 tw-py-3">
                              <input type="number" value={book.price}
                                onChange={(e) => updateBook(classIndex, bookIndex, "price", parseFloat(e.target.value) || 0)}
                                min="0" step="0.01"
                                className="tw-w-20 tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500 tw-transition-colors"
                              />
                            </td>
                            {/* Delete */}
                            <td className="tw-px-3 tw-py-3 tw-text-center">
                              <button
                                onClick={() => removeBook(classIndex, bookIndex)}
                                className="tw-w-8 tw-h-8 tw-bg-red-50 tw-text-red-500 tw-rounded-lg tw-font-bold tw-flex tw-items-center tw-justify-center hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors"
                                title="Delete book"
                              >✕</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Class Footer */}
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-4 tw-pt-4 tw-border-t-2 tw-border-slate-100">
                      <button onClick={() => addBook(classIndex)}
                        className="tw-px-4 tw-py-2 tw-bg-slate-800 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs hover:tw-bg-slate-700 tw-transition-colors"
                      >+ Add Book</button>
                      <div className="tw-text-base tw-font-extrabold tw-text-slate-700">
                        Total: <span className="tw-text-amber-500 tw-ml-1">₹{getClassTotal(cls.books).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Save */}
              <div className="tw-text-center tw-mt-6 tw-mb-4">
                <button onClick={handleSave} disabled={saving}
                  className="tw-px-10 tw-py-3.5 tw-bg-emerald-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-base hover:tw-bg-emerald-600 tw-transition-colors disabled:tw-opacity-60 disabled:tw-cursor-not-allowed tw-shadow-lg tw-shadow-emerald-500/20"
                >
                  {saving ? "⏳ Saving..." : "💾 Save All Changes"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="tw-fixed tw-bottom-6 tw-right-6 tw-bg-emerald-500 tw-text-white tw-px-6 tw-py-3.5 tw-rounded-xl tw-font-bold tw-text-sm tw-shadow-xl tw-shadow-emerald-500/30 tw-z-[9999] tw-animate-bounce">
          {toastMessage}
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default AdminPage;
