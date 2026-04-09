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
import { getFeeData, saveFeeData, getFeeYears, createFeeYear, deleteFeeYear, migrateFeeData } from "../data/feeData";

const ADMIN_PASSWORD = "Suzain@1918";

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
  const [adminTab, setAdminTab] = useState("books");
  const [feeData, setFeeData] = useState(null);
  const [feeLoading, setFeeLoading] = useState(false);
  const [feeSaving, setFeeSaving] = useState(false);
  const [feeYears, setFeeYears] = useState([]);
  const [selectedFeeYear, setSelectedFeeYear] = useState("");
  const [newFeeYear, setNewFeeYear] = useState("");
  const [showNewFeeYearInput, setShowNewFeeYearInput] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver = (e, index) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDragLeave = () => setDragOverIndex(null);
  const handleDragEnd = () => { setDragIndex(null); setDragOverIndex(null); };
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) { handleDragEnd(); return; }
    setBookData((p) => {
      const c = [...p.classes];
      const [moved] = c.splice(dragIndex, 1);
      c.splice(dropIndex, 0, moved);
      return { ...p, classes: c };
    });
    handleDragEnd();
  };

  useEffect(() => {
    if (!authenticated) return;
    const fetchYears = async () => {
      setLoading(true);
      await migrateOldData();
      const availableYears = await getAvailableYears();
      setYears(availableYears);
      if (availableYears.length > 0) setSelectedYear(availableYears[0]);
      setLoading(false);
    };
    fetchYears();
  }, [authenticated]);

  // Fetch fee years when tab switches
  useEffect(() => {
    if (adminTab !== "fees" || !authenticated || feeYears.length > 0) return;
    const init = async () => {
      setFeeLoading(true);
      await migrateFeeData();
      const yrs = await getFeeYears();
      setFeeYears(yrs);
      if (yrs.length > 0) setSelectedFeeYear(yrs[0]);
      setFeeLoading(false);
    };
    init();
  }, [adminTab, authenticated]);

  // Fetch fee data when year changes
  useEffect(() => {
    if (!selectedFeeYear || !authenticated) return;
    const fetchFees = async () => {
      setFeeLoading(true);
      const data = await getFeeData(selectedFeeYear);
      setFeeData(data);
      setFeeLoading(false);
    };
    fetchFees();
  }, [selectedFeeYear, authenticated]);

  const handleSaveFees = async () => {
    if (!selectedFeeYear || !feeData) return;
    setFeeSaving(true);
    const success = await saveFeeData(selectedFeeYear, feeData);
    setFeeSaving(false);
    showToastMsg(success ? "✅ Fee structure saved!" : "❌ Error saving.");
  };

  const handleCreateFeeYear = async () => {
    const yr = newFeeYear.trim();
    if (!yr) return;
    if (feeYears.includes(yr)) { showToastMsg("❌ Year exists."); return; }
    const success = await createFeeYear(yr, feeData?.schoolName || "SPRING FIELD SCHOOL");
    if (success) {
      const updated = [yr, ...feeYears].sort((a, b) => b.localeCompare(a));
      setFeeYears(updated);
      setSelectedFeeYear(yr);
      setNewFeeYear("");
      setShowNewFeeYearInput(false);
      showToastMsg("✅ Year created!");
    }
  };

  const handleDeleteFeeYear = async () => {
    if (!selectedFeeYear || !window.confirm(`Delete fee structure for "${selectedFeeYear}"?`)) return;
    const success = await deleteFeeYear(selectedFeeYear);
    if (success) {
      const updated = feeYears.filter((y) => y !== selectedFeeYear);
      setFeeYears(updated);
      setSelectedFeeYear(updated.length > 0 ? updated[0] : "");
      setFeeData(null);
      showToastMsg("✅ Year deleted.");
    }
  };

  const updateFee = (catIndex, className, value) => {
    setFeeData((p) => {
      const cats = [...p.feeCategories];
      cats[catIndex] = { ...cats[catIndex], fees: { ...cats[catIndex].fees, [className]: value } };
      return { ...p, feeCategories: cats };
    });
  };

  const addFeeClass = () => {
    if (!newClassName.trim()) return;
    setFeeData((p) => ({ ...p, classes: [...p.classes, newClassName.trim().toUpperCase()] }));
    setNewClassName("");
  };

  const removeFeeClass = (index) => {
    setFeeData((p) => {
      const cls = p.classes[index];
      const cats = p.feeCategories.map((cat) => {
        const fees = { ...cat.fees };
        delete fees[cls];
        return { ...cat, fees };
      });
      return { ...p, classes: p.classes.filter((_, i) => i !== index), feeCategories: cats };
    });
  };

  const addFeeCategory = () => {
    if (!newCatName.trim()) return;
    const id = `cat_${Date.now()}`;
    setFeeData((p) => ({
      ...p,
      feeCategories: [...p.feeCategories, { id, name: newCatName.trim(), fees: {} }],
    }));
    setNewCatName("");
  };

  const removeFeeCategory = (index) => {
    setFeeData((p) => ({ ...p, feeCategories: p.feeCategories.filter((_, i) => i !== index) }));
  };

  const updateFeeCategoryName = (index, name) => {
    setFeeData((p) => {
      const cats = [...p.feeCategories];
      cats[index] = { ...cats[index], name };
      return { ...p, feeCategories: cats };
    });
  };

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
    if (years.includes(yearStr)) { showToastMsg("❌ Year already exists."); return; }
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
    if (!window.confirm(`Delete the book list for "${selectedYear}"?`)) return;
    const success = await deleteYear(selectedYear);
    if (success) {
      const updatedYears = years.filter((y) => y !== selectedYear);
      setYears(updatedYears);
      setSelectedYear(updatedYears.length > 0 ? updatedYears[0] : "");
      setBookData(null);
      showToastMsg("✅ Year deleted.");
    }
  };

  const updateSchoolName = (v) => setBookData((p) => ({ ...p, schoolName: v }));
  const updateClassName = (ci, v) => {
    setBookData((p) => {
      const c = [...p.classes]; c[ci] = { ...c[ci], name: v };
      return { ...p, classes: c };
    });
  };
  const addClass = () => {
    setBookData((p) => ({
      ...p, classes: [...p.classes, { id: generateClassId(p.classes), name: "NEW CLASS", books: [] }],
    }));
  };
  const removeClass = (ci) => {
    if (!window.confirm("Delete this class?")) return;
    setBookData((p) => ({ ...p, classes: p.classes.filter((_, i) => i !== ci) }));
  };
  const updateBook = (ci, bi, field, value) => {
    setBookData((p) => {
      const c = [...p.classes]; const b = [...c[ci].books];
      b[bi] = { ...b[bi], [field]: value };
      c[ci] = { ...c[ci], books: b };
      return { ...p, classes: c };
    });
  };
  const addBook = (ci) => {
    setBookData((p) => {
      const c = [...p.classes]; const cls = c[ci];
      const b = [...cls.books, { id: generateBookId(cls.books), name: "", price: 0, frontImage: "", backImage: "" }];
      c[ci] = { ...cls, books: b };
      return { ...p, classes: c };
    });
  };
  const removeBook = (ci, bi) => {
    setBookData((p) => {
      const c = [...p.classes];
      c[ci] = { ...c[ci], books: c[ci].books.filter((_, i) => i !== bi) };
      return { ...p, classes: c };
    });
  };

  const handleImageUpload = useCallback(async (ci, bi, field, file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Image must be under 10MB"); return; }
    try {
      const base64 = await fileToBase64(file);
      updateBook(ci, bi, field, base64);
    } catch (err) {
      console.error(err);
      alert("Failed to process image.");
    }
  }, []);

  const triggerFileInput = (key) => { if (fileInputRefs.current[key]) fileInputRefs.current[key].click(); };

  // Login
  if (!authenticated) {
    return (
      <Fragment>
        <Header />
        <PageHeader title="Admin Panel" curPage="Admin" />
        <div className="tw-min-h-[60vh] tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-10 tw-px-4">
          <div className="tw-w-full tw-max-w-md">
            <div className="tw-bg-white tw-rounded-2xl tw-shadow-xl tw-shadow-slate-200/50 tw-border tw-border-slate-200/60 tw-p-6 sm:tw-p-10">
              <div className="tw-text-center tw-mb-8">
                <div className="tw-w-14 tw-h-14 tw-bg-gradient-to-br tw-from-slate-800 tw-to-slate-900 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4 tw-text-xl">🔐</div>
                <h3 className="tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-text-slate-800">Admin Login</h3>
                <p className="tw-text-slate-500 tw-text-sm tw-mt-1">Enter password to manage book lists</p>
              </div>
              <form onSubmit={handleLogin}>
                <div className="tw-mb-5">
                  <label className="tw-block tw-text-sm tw-font-semibold tw-text-slate-600 tw-mb-2">Password</label>
                  <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password" autoFocus
                    className="tw-w-full tw-px-4 tw-py-3 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-base tw-outline-none focus:tw-border-amber-500 tw-transition-colors"
                  />
                  {error && <p className="tw-mt-2 tw-text-red-500 tw-text-sm tw-font-semibold">{error}</p>}
                </div>
                <button type="submit" className="tw-w-full tw-py-3 tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm tw-uppercase tw-tracking-wider hover:tw-from-slate-700 hover:tw-to-slate-800 tw-transition-all">
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

  // Dashboard
  return (
    <Fragment>
      <Header />
      <PageHeader title="Admin Panel" curPage="Admin" />
      <div className="tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-6 sm:tw-py-8 tw-px-3 sm:tw-px-6 lg:tw-px-8 tw-min-h-[80vh]">
        <div className="tw-max-w-7xl tw-mx-auto">
          {/* Top Bar */}
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-start sm:tw-items-center tw-justify-between tw-gap-3 tw-mb-5">
            <h3 className="tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-text-slate-800">🏫 Admin Panel</h3>
            <button onClick={handleLogout}
              className="tw-px-4 tw-py-2 tw-bg-white tw-text-slate-600 tw-border-2 tw-border-slate-200 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm hover:tw-border-slate-400 tw-transition-colors">
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="tw-flex tw-gap-1 tw-bg-white tw-rounded-xl tw-p-1 tw-shadow-sm tw-border tw-border-slate-200/60 tw-mb-5">
            <button onClick={() => setAdminTab("books")}
              className={`tw-flex-1 tw-py-2.5 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-transition-all ${adminTab === "books" ? "tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-text-white tw-shadow-md" : "tw-text-slate-500 hover:tw-text-slate-800 hover:tw-bg-slate-50"}`}>
              📚 Book Lists
            </button>
            <button onClick={() => setAdminTab("fees")}
              className={`tw-flex-1 tw-py-2.5 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-transition-all ${adminTab === "fees" ? "tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-text-white tw-shadow-md" : "tw-text-slate-500 hover:tw-text-slate-800 hover:tw-bg-slate-50"}`}>
              💰 Fee Structure
            </button>
          </div>

          {adminTab === "books" && (
          <>

          {/* Year Selector */}
          <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
            <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">📅 Academic Year</h4>
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
              {years.map((year) => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  className={`tw-px-3 sm:tw-px-5 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-transition-all tw-border-2 ${
                    selectedYear === year
                      ? "tw-bg-amber-500 tw-text-white tw-border-amber-500 tw-shadow-lg tw-shadow-amber-500/25"
                      : "tw-bg-white tw-text-slate-600 tw-border-slate-200 hover:tw-border-amber-400"
                  }`}>
                  {year}
                </button>
              ))}

              {showNewYearInput ? (
                <div className="tw-flex tw-items-center tw-gap-2 tw-w-full sm:tw-w-auto tw-mt-1 sm:tw-mt-0">
                  <input type="text" value={newYear} onChange={(e) => setNewYear(e.target.value)}
                    placeholder="e.g. 2025-2026" autoFocus onKeyDown={(e) => e.key === "Enter" && handleCreateYear()}
                    className="tw-flex-1 sm:tw-w-36 tw-px-3 tw-py-2 tw-border-2 tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500"
                  />
                  <button onClick={handleCreateYear} className="tw-px-3 tw-py-2 tw-bg-emerald-500 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs">Create</button>
                  <button onClick={() => { setShowNewYearInput(false); setNewYear(""); }} className="tw-px-2 tw-py-2 tw-text-slate-400 tw-text-xs tw-font-bold">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setShowNewYearInput(true)}
                  className="tw-px-3 sm:tw-px-5 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-border-2 tw-border-dashed tw-border-slate-300 tw-text-slate-400 hover:tw-border-amber-400 hover:tw-text-amber-600 tw-transition-colors">
                  + New Year
                </button>
              )}
            </div>
            {selectedYear && (
              <button onClick={handleDeleteYear}
                className="tw-mt-3 tw-px-3 tw-py-1.5 tw-rounded-lg tw-font-bold tw-text-xs tw-bg-red-50 tw-text-red-500 tw-border tw-border-red-200 hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors">
                🗑️ Delete {selectedYear}
              </button>
            )}
          </div>

          {!selectedYear || !bookData ? (
            <div className="tw-text-center tw-py-20">
              <p className="tw-text-slate-400 tw-text-lg tw-font-medium">{!selectedYear ? 'Create a year to get started.' : 'Loading...'}</p>
            </div>
          ) : (
            <>
              {/* School Info */}
              <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
                <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">🏫 School Information</h4>
                <div>
                  <label className="tw-block tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-mb-1">School Name</label>
                  <input type="text" value={bookData.schoolName} onChange={(e) => updateSchoolName(e.target.value)}
                    className="tw-w-full sm:tw-max-w-md tw-px-3 tw-py-2.5 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-sm tw-outline-none focus:tw-border-amber-500"
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                <p className="tw-text-slate-500 tw-text-xs sm:tw-text-sm tw-font-medium">
                  Editing: <span className="tw-font-bold tw-text-amber-600">{selectedYear}</span> · {bookData.classes.length} classes
                </p>
                <button onClick={addClass} className="tw-px-3 sm:tw-px-5 tw-py-2 tw-bg-amber-500 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm hover:tw-bg-amber-600 tw-transition-colors tw-shadow-sm">
                  + Add Class
                </button>
              </div>

              {/* Classes */}
              {bookData.classes.map((cls, ci) => (
                <div
                  key={cls.id}
                  draggable
                  onDragStart={() => handleDragStart(ci)}
                  onDragOver={(e) => handleDragOver(e, ci)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, ci)}
                  onDragEnd={handleDragEnd}
                  className={`tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-overflow-hidden tw-mb-5 tw-transition-all tw-duration-200 ${dragIndex === ci ? 'tw-opacity-50 tw-scale-[0.98] tw-border-amber-400' : dragOverIndex === ci ? 'tw-border-amber-500 tw-shadow-lg tw-shadow-amber-500/20 tw-border-2' : 'tw-border-slate-200/60'}`}
                >
                  {/* Class Header */}
                  <div className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-4 sm:tw-px-6 tw-py-3 sm:tw-py-4 tw-flex tw-items-center tw-justify-between tw-gap-2">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <span className="tw-cursor-grab active:tw-cursor-grabbing tw-text-white/50 hover:tw-text-white tw-text-lg tw-select-none tw-shrink-0" title="Drag to reorder">⠿</span>
                      <input type="text" value={cls.name} onChange={(e) => updateClassName(ci, e.target.value)}
                        placeholder="Class Name"
                        className="tw-bg-white/10 tw-border tw-border-white/20 tw-text-white tw-px-3 tw-py-1.5 tw-rounded-lg tw-text-base sm:tw-text-lg tw-font-bold tw-uppercase tw-tracking-wider tw-outline-none focus:tw-border-amber-400 tw-w-full tw-max-w-[200px] placeholder:tw-text-white/40"
                      />
                    </div>
                    <button onClick={() => removeClass(ci)} className="tw-px-3 tw-py-1.5 tw-bg-red-500/80 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs hover:tw-bg-red-500 tw-transition-colors tw-whitespace-nowrap tw-shrink-0">
                      Delete
                    </button>
                  </div>

                  {/* Mobile Card View for Books */}
                  <div className="sm:tw-hidden tw-p-3">
                    {cls.books.map((book, bi) => (
                      <div key={book.id} className="tw-border tw-border-slate-200 tw-rounded-lg tw-p-3 tw-mb-3 last:tw-mb-0">
                        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-400">Book #{bi + 1}</span>
                          <button onClick={() => removeBook(ci, bi)}
                            className="tw-w-7 tw-h-7 tw-bg-red-50 tw-text-red-500 tw-rounded-md tw-text-xs tw-font-bold tw-flex tw-items-center tw-justify-center hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors">
                            ✕
                          </button>
                        </div>
                        <input type="text" value={book.name} onChange={(e) => updateBook(ci, bi, "name", e.target.value)}
                          placeholder="Book Name" className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-mb-2 tw-outline-none focus:tw-border-amber-500"
                        />
                        <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                          <label className="tw-text-xs tw-font-bold tw-text-slate-500 tw-shrink-0">Price ₹</label>
                          <input type="number" value={book.price || ""} min="0" step="0.01"
                            onChange={(e) => updateBook(ci, bi, "price", parseFloat(e.target.value) || 0)}
                            className="tw-w-24 tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500"
                          />
                        </div>
                        <div className="tw-flex tw-gap-3">
                          {/* Front */}
                          <div className="tw-flex-1">
                            <label className="tw-block tw-text-[10px] tw-font-bold tw-text-slate-400 tw-uppercase tw-mb-1">Front</label>
                            {book.frontImage && (
                              <div className="tw-relative tw-group tw-mb-1.5 tw-inline-block">
                                <img src={book.frontImage} alt="Front" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-md tw-border tw-border-slate-200" />
                                <button onClick={() => updateBook(ci, bi, "frontImage", "")}
                                  className="tw-absolute tw--top-1 tw--right-1 tw-w-4 tw-h-4 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[8px] tw-flex tw-items-center tw-justify-center">✕</button>
                              </div>
                            )}
                            <input type="file" accept="image/*" className="tw-hidden" ref={(el) => (fileInputRefs.current[`front_${ci}_${bi}`] = el)}
                              onChange={(e) => handleImageUpload(ci, bi, "frontImage", e.target.files[0])} />
                            <button onClick={() => triggerFileInput(`front_${ci}_${bi}`)}
                              className="tw-text-[10px] tw-px-2 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded tw-text-slate-500">📷 Upload</button>
                          </div>
                          {/* Back */}
                          <div className="tw-flex-1">
                            <label className="tw-block tw-text-[10px] tw-font-bold tw-text-slate-400 tw-uppercase tw-mb-1">Back</label>
                            {book.backImage && (
                              <div className="tw-relative tw-group tw-mb-1.5 tw-inline-block">
                                <img src={book.backImage} alt="Back" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-md tw-border tw-border-slate-200" />
                                <button onClick={() => updateBook(ci, bi, "backImage", "")}
                                  className="tw-absolute tw--top-1 tw--right-1 tw-w-4 tw-h-4 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[8px] tw-flex tw-items-center tw-justify-center">✕</button>
                              </div>
                            )}
                            <input type="file" accept="image/*" className="tw-hidden" ref={(el) => (fileInputRefs.current[`back_${ci}_${bi}`] = el)}
                              onChange={(e) => handleImageUpload(ci, bi, "backImage", e.target.files[0])} />
                            <button onClick={() => triggerFileInput(`back_${ci}_${bi}`)}
                              className="tw-text-[10px] tw-px-2 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded tw-text-slate-500">📷 Upload</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-3 tw-pt-3 tw-border-t tw-border-slate-100">
                      <button onClick={() => addBook(ci)} className="tw-px-3 tw-py-1.5 tw-bg-slate-800 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs">+ Add Book</button>
                      <span className="tw-font-extrabold tw-text-sm tw-text-slate-700">Total: <span className="tw-text-amber-500">₹{getClassTotal(cls.books).toFixed(2)}</span></span>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div className="tw-hidden sm:tw-block tw-p-5 tw-overflow-x-auto">
                    <table className="tw-w-full tw-text-sm">
                      <thead>
                        <tr className="tw-border-b-2 tw-border-slate-200">
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-w-10">#</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Front</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Back</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-left tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase">Book Name</th>
                          <th className="tw-px-3 tw-py-2.5 tw-text-left tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-w-24">Price (₹)</th>
                          <th className="tw-px-3 tw-py-2.5 tw-w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="tw-divide-y tw-divide-slate-100">
                        {cls.books.map((book, bi) => (
                          <tr key={book.id} className="hover:tw-bg-slate-50/50">
                            <td className="tw-px-3 tw-py-3 tw-text-center tw-font-bold tw-text-slate-400">{bi + 1}</td>
                            <td className="tw-px-3 tw-py-3">
                              <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                {book.frontImage && (
                                  <div className="tw-relative tw-group">
                                    <img src={book.frontImage} alt="Front" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200" />
                                    <button onClick={() => updateBook(ci, bi, "frontImage", "")} className="tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity">✕</button>
                                  </div>
                                )}
                                <input type="file" accept="image/*" className="tw-hidden" ref={(el) => (fileInputRefs.current[`front_${ci}_${bi}`] = el)} onChange={(e) => handleImageUpload(ci, bi, "frontImage", e.target.files[0])} />
                                <button onClick={() => triggerFileInput(`front_${ci}_${bi}`)} className="tw-text-xs tw-px-3 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-md tw-text-slate-500 hover:tw-bg-slate-200 tw-transition-colors tw-whitespace-nowrap">📷 Upload</button>
                              </div>
                            </td>
                            <td className="tw-px-3 tw-py-3">
                              <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                {book.backImage && (
                                  <div className="tw-relative tw-group">
                                    <img src={book.backImage} alt="Back" className="tw-w-14 tw-h-[70px] tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200" />
                                    <button onClick={() => updateBook(ci, bi, "backImage", "")} className="tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity">✕</button>
                                  </div>
                                )}
                                <input type="file" accept="image/*" className="tw-hidden" ref={(el) => (fileInputRefs.current[`back_${ci}_${bi}`] = el)} onChange={(e) => handleImageUpload(ci, bi, "backImage", e.target.files[0])} />
                                <button onClick={() => triggerFileInput(`back_${ci}_${bi}`)} className="tw-text-xs tw-px-3 tw-py-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-md tw-text-slate-500 hover:tw-bg-slate-200 tw-transition-colors tw-whitespace-nowrap">📷 Upload</button>
                              </div>
                            </td>
                            <td className="tw-px-3 tw-py-3">
                              <input type="text" value={book.name} onChange={(e) => updateBook(ci, bi, "name", e.target.value)} placeholder="Book Name"
                                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                            </td>
                            <td className="tw-px-3 tw-py-3">
                              <input type="number" value={book.price || ""} onChange={(e) => updateBook(ci, bi, "price", parseFloat(e.target.value) || 0)} min="0" step="0.01"
                                className="tw-w-20 tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                            </td>
                            <td className="tw-px-3 tw-py-3 tw-text-center">
                              <button onClick={() => removeBook(ci, bi)} title="Delete book"
                                className="tw-w-8 tw-h-8 tw-bg-red-50 tw-text-red-500 tw-rounded-lg tw-font-bold tw-flex tw-items-center tw-justify-center hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors">✕</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-4 tw-pt-4 tw-border-t-2 tw-border-slate-100">
                      <button onClick={() => addBook(ci)} className="tw-px-4 tw-py-2 tw-bg-slate-800 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs hover:tw-bg-slate-700 tw-transition-colors">+ Add Book</button>
                      <div className="tw-text-base tw-font-extrabold tw-text-slate-700">Total: <span className="tw-text-amber-500 tw-ml-1">₹{getClassTotal(cls.books).toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Save */}
              <div className="tw-text-center tw-mt-5 tw-mb-4">
                <button onClick={handleSave} disabled={saving}
                  className="tw-w-full sm:tw-w-auto tw-px-10 tw-py-3 tw-bg-emerald-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm sm:tw-text-base hover:tw-bg-emerald-600 tw-transition-colors disabled:tw-opacity-60 tw-shadow-lg tw-shadow-emerald-500/20">
                  {saving ? "⏳ Saving..." : "💾 Save All Changes"}
                </button>
              </div>
            </>
          )}
          </>
          )}

          {/* Fee Structure Tab */}
          {adminTab === "fees" && (
            <>
              {/* Fee Year Selector */}
              <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
                <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">📅 Fee Structure Year</h4>
                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
                  {feeYears.map((yr) => (
                    <button key={yr} onClick={() => setSelectedFeeYear(yr)}
                      className={`tw-px-3 sm:tw-px-5 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-transition-all tw-border-2 ${
                        selectedFeeYear === yr
                          ? "tw-bg-amber-500 tw-text-white tw-border-amber-500 tw-shadow-lg tw-shadow-amber-500/25"
                          : "tw-bg-white tw-text-slate-600 tw-border-slate-200 hover:tw-border-amber-400"
                      }`}>
                      {yr}
                    </button>
                  ))}
                  {showNewFeeYearInput ? (
                    <div className="tw-flex tw-items-center tw-gap-2 tw-w-full sm:tw-w-auto tw-mt-1 sm:tw-mt-0">
                      <input type="text" value={newFeeYear} onChange={(e) => setNewFeeYear(e.target.value)}
                        placeholder="e.g. 2025-2026" autoFocus onKeyDown={(e) => e.key === "Enter" && handleCreateFeeYear()}
                        className="tw-flex-1 sm:tw-w-36 tw-px-3 tw-py-2 tw-border-2 tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                      <button onClick={handleCreateFeeYear} className="tw-px-3 tw-py-2 tw-bg-emerald-500 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs">Create</button>
                      <button onClick={() => { setShowNewFeeYearInput(false); setNewFeeYear(""); }} className="tw-px-2 tw-py-2 tw-text-slate-400 tw-text-xs tw-font-bold">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowNewFeeYearInput(true)}
                      className="tw-px-3 sm:tw-px-5 tw-py-2 tw-rounded-lg tw-font-bold tw-text-xs sm:tw-text-sm tw-border-2 tw-border-dashed tw-border-slate-300 tw-text-slate-400 hover:tw-border-amber-400 hover:tw-text-amber-600 tw-transition-colors">
                      + New Year
                    </button>
                  )}
                </div>
                {selectedFeeYear && (
                  <button onClick={handleDeleteFeeYear}
                    className="tw-mt-3 tw-px-3 tw-py-1.5 tw-rounded-lg tw-font-bold tw-text-xs tw-bg-red-50 tw-text-red-500 tw-border tw-border-red-200 hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors">
                    🗑️ Delete {selectedFeeYear}
                  </button>
                )}
              </div>

              {feeLoading ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-py-20">
                  <div className="tw-w-10 tw-h-10 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin"></div>
                </div>
              ) : !selectedFeeYear ? (
                <div className="tw-text-center tw-py-20">
                  <p className="tw-text-slate-400 tw-text-lg tw-font-medium">Create a year to get started.</p>
                </div>
              ) : feeData ? (
                <>
                  {/* School Name */}
                  <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
                    <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">📋 Fee Details</h4>
                    <div>
                      <label className="tw-block tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-mb-1">School Name</label>
                      <input type="text" value={feeData.schoolName} onChange={(e) => setFeeData((p) => ({ ...p, schoolName: e.target.value }))}
                        className="tw-w-full sm:tw-w-1/2 tw-px-3 tw-py-2.5 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                    </div>
                  </div>

                  {/* Classes (columns) */}
                  <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
                    <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">🎓 Classes</h4>
                    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mb-3">
                      {feeData.classes.map((cls, i) => (
                        <div key={i} className="tw-flex tw-items-center tw-gap-1 tw-bg-slate-100 tw-border tw-border-slate-200 tw-rounded-lg tw-px-3 tw-py-1.5">
                          <span className="tw-text-xs tw-font-bold tw-text-slate-700">{cls}</span>
                          <button onClick={() => removeFeeClass(i)} className="tw-text-red-400 hover:tw-text-red-600 tw-text-xs tw-ml-1">✕</button>
                        </div>
                      ))}
                    </div>
                    <div className="tw-flex tw-gap-2">
                      <input type="text" value={newClassName} onChange={(e) => setNewClassName(e.target.value)}
                        placeholder="Add class (e.g. IX)" onKeyDown={(e) => e.key === "Enter" && addFeeClass()}
                        className="tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500 tw-w-40" />
                      <button onClick={addFeeClass} className="tw-px-3 tw-py-2 tw-bg-slate-800 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs">+ Add</button>
                    </div>
                  </div>

                  {/* Fee Table */}
                  <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-overflow-hidden tw-mb-5">
                    <div className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-4 sm:tw-px-6 tw-py-4">
                      <h4 className="tw-text-white tw-font-bold tw-text-sm sm:tw-text-base">💰 Fee Amounts</h4>
                    </div>

                    {/* Mobile: card per category */}
                    <div className="sm:tw-hidden tw-p-3">
                      {feeData.feeCategories.map((cat, catIdx) => (
                        <div key={cat.id} className="tw-border tw-border-slate-200 tw-rounded-lg tw-p-3 tw-mb-3 last:tw-mb-0">
                          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                            <input type="text" value={cat.name} onChange={(e) => updateFeeCategoryName(catIdx, e.target.value)}
                              className="tw-flex-1 tw-text-sm tw-font-bold tw-text-slate-700 tw-border-b tw-border-transparent focus:tw-border-amber-400 tw-outline-none tw-mr-2" />
                            <button onClick={() => removeFeeCategory(catIdx)} className="tw-w-6 tw-h-6 tw-bg-red-50 tw-text-red-500 tw-rounded tw-text-xs tw-flex tw-items-center tw-justify-center">✕</button>
                          </div>
                          <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                            {feeData.classes.map((cls, ci) => (
                              <div key={ci}>
                                <label className="tw-text-[10px] tw-font-bold tw-text-slate-400 tw-uppercase">{cls}</label>
                                <input type="number" value={cat.fees[cls] || ""}
                                  onChange={(e) => updateFee(catIdx, cls, e.target.value)}
                                  placeholder="0" min="0"
                                  className="tw-w-full tw-px-2 tw-py-1.5 tw-border tw-border-slate-200 tw-rounded tw-text-xs tw-outline-none focus:tw-border-amber-500" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: full table */}
                    <div className="tw-hidden sm:tw-block tw-overflow-x-auto tw-p-4">
                      <table className="tw-w-full tw-text-sm">
                        <thead>
                          <tr className="tw-border-b-2 tw-border-slate-200">
                            <th className="tw-px-3 tw-py-2.5 tw-text-left tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-min-w-[160px]">Category</th>
                            {feeData.classes.map((cls, i) => (
                              <th key={i} className="tw-px-2 tw-py-2.5 tw-text-center tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-min-w-[80px]">{cls}</th>
                            ))}
                            <th className="tw-w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="tw-divide-y tw-divide-slate-100">
                          {feeData.feeCategories.map((cat, catIdx) => (
                            <tr key={cat.id} className="hover:tw-bg-slate-50/50">
                              <td className="tw-px-3 tw-py-2">
                                <input type="text" value={cat.name} onChange={(e) => updateFeeCategoryName(catIdx, e.target.value)}
                                  className="tw-w-full tw-px-2 tw-py-1.5 tw-border tw-border-slate-200 tw-rounded tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                              </td>
                              {feeData.classes.map((cls, ci) => (
                                <td key={ci} className="tw-px-2 tw-py-2">
                                  <input type="number" value={cat.fees[cls] || ""}
                                    onChange={(e) => updateFee(catIdx, cls, e.target.value)}
                                    placeholder="0" min="0"
                                    className="tw-w-full tw-px-2 tw-py-1.5 tw-border tw-border-slate-200 tw-rounded tw-text-sm tw-text-center tw-outline-none focus:tw-border-amber-500" />
                                </td>
                              ))}
                              <td className="tw-px-2 tw-py-2">
                                <button onClick={() => removeFeeCategory(catIdx)}
                                  className="tw-w-7 tw-h-7 tw-bg-red-50 tw-text-red-500 tw-rounded tw-font-bold tw-text-xs tw-flex tw-items-center tw-justify-center hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors">✕</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Category */}
                    <div className="tw-px-4 tw-pb-4">
                      <div className="tw-flex tw-gap-2 tw-pt-3 tw-border-t tw-border-slate-100">
                        <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="New fee category name" onKeyDown={(e) => e.key === "Enter" && addFeeCategory()}
                          className="tw-flex-1 tw-px-3 tw-py-2 tw-border tw-border-slate-200 tw-rounded-lg tw-text-sm tw-outline-none focus:tw-border-amber-500" />
                        <button onClick={addFeeCategory} className="tw-px-4 tw-py-2 tw-bg-slate-800 tw-text-white tw-rounded-lg tw-font-bold tw-text-xs">+ Add Category</button>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-sm tw-border tw-border-slate-200/60 tw-p-4 sm:tw-p-6 tw-mb-5">
                    <h4 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-slate-700 tw-mb-3">📝 Notes</h4>
                    <textarea value={feeData.notes || ""} onChange={(e) => setFeeData((p) => ({ ...p, notes: e.target.value }))}
                      rows={3} placeholder="Any additional notes (shown on the public fee structure page)"
                      className="tw-w-full tw-px-3 tw-py-2.5 tw-border-2 tw-border-slate-200 tw-rounded-xl tw-text-sm tw-outline-none focus:tw-border-amber-500 tw-resize-y" />
                  </div>

                  {/* Save Fees */}
                  <div className="tw-text-center tw-mt-5 tw-mb-4">
                    <button onClick={handleSaveFees} disabled={feeSaving}
                      className="tw-w-full sm:tw-w-auto tw-px-10 tw-py-3 tw-bg-emerald-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm sm:tw-text-base hover:tw-bg-emerald-600 tw-transition-colors disabled:tw-opacity-60 tw-shadow-lg tw-shadow-emerald-500/20">
                      {feeSaving ? "⏳ Saving..." : "💾 Save Fee Structure"}
                    </button>
                  </div>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>

      {showToast && (
        <div className="tw-fixed tw-bottom-4 tw-left-4 tw-right-4 sm:tw-left-auto sm:tw-right-6 tw-bg-emerald-500 tw-text-white tw-px-5 tw-py-3 tw-rounded-xl tw-font-bold tw-text-sm tw-shadow-xl tw-shadow-emerald-500/30 tw-z-[9999] tw-text-center sm:tw-text-left">
          {toastMessage}
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default AdminPage;
