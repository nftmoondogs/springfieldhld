import { Fragment, useState, useRef, useCallback } from "react";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Footer from "../component/layout/footer";
import {
  getBookData,
  saveBookData,
  getClassTotal,
  generateBookId,
  generateClassId,
} from "../data/bookData";
import "../assets/css/bookList.css";

const ADMIN_PASSWORD = "Suzain@1918";

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookData, setBookData] = useState(() => getBookData());
  const [showToast, setShowToast] = useState(false);
  const fileInputRefs = useRef({});

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

  const handleSave = () => {
    saveBookData(bookData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const updateSchoolName = (value) => {
    setBookData((prev) => ({ ...prev, schoolName: value }));
  };

  const updateYear = (value) => {
    setBookData((prev) => ({ ...prev, year: value }));
  };

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
      classes: [
        ...prev.classes,
        {
          id: generateClassId(prev.classes),
          name: "NEW CLASS",
          books: [],
        },
      ],
    }));
  };

  const removeClass = (classIndex) => {
    if (!window.confirm("Are you sure you want to delete this entire class and all its books?")) return;
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
      const newBooks = [
        ...cls.books,
        {
          id: generateBookId(cls.books),
          name: "",
          price: 0,
          frontImage: "",
          backImage: "",
        },
      ];
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

  const handleImageUpload = useCallback((classIndex, bookIndex, field, file) => {
    if (!file) return;
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      updateBook(classIndex, bookIndex, field, e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const triggerFileInput = (key) => {
    if (fileInputRefs.current[key]) {
      fileInputRefs.current[key].click();
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <Fragment>
        <Header />
        <PageHeader title="Admin Panel" curPage="Admin" />
        <div className="admin-login-section">
          <div className="container">
            <div className="admin-login-card">
              <h3>🔐 Admin Login</h3>
              <p>Enter the admin password to manage the book list.</p>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  {error && <div className="admin-login-error">{error}</div>}
                </div>
                <button type="submit" className="admin-login-btn">
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

  // Admin dashboard
  return (
    <Fragment>
      <Header />
      <PageHeader title="Admin Panel" curPage="Admin" />
      <div className="admin-section">
        <div className="container">
          {/* Top Bar */}
          <div className="admin-top-bar">
            <h3>📚 Book List Manager</h3>
            <div className="admin-top-actions">
              <button className="admin-btn admin-btn-warning" onClick={addClass}>
                + Add Class
              </button>
              <button className="admin-btn admin-btn-success" onClick={handleSave}>
                💾 Save All Changes
              </button>
              <button className="admin-btn admin-btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* School Settings */}
          <div className="admin-settings-card">
            <h4>School Information</h4>
            <div className="admin-settings-row">
              <div className="admin-field">
                <label>School Name</label>
                <input
                  type="text"
                  value={bookData.schoolName}
                  onChange={(e) => updateSchoolName(e.target.value)}
                />
              </div>
              <div className="admin-field">
                <label>Academic Year</label>
                <input
                  type="text"
                  value={bookData.year}
                  onChange={(e) => updateYear(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Class Sections */}
          {bookData.classes.map((cls, classIndex) => (
            <div className="admin-class-card" key={cls.id}>
              <div className="admin-class-header">
                <div className="admin-class-header-left">
                  <input
                    type="text"
                    value={cls.name}
                    onChange={(e) => updateClassName(classIndex, e.target.value)}
                    placeholder="Class Name"
                  />
                </div>
                <button
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  onClick={() => removeClass(classIndex)}
                >
                  Delete Class
                </button>
              </div>

              <div className="admin-class-body">
                <table className="admin-book-table">
                  <thead>
                    <tr>
                      <th className="col-num">#</th>
                      <th>Front Image</th>
                      <th>Back Image</th>
                      <th>Book Name</th>
                      <th>Price (₹)</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cls.books.map((book, bookIndex) => (
                      <tr key={book.id}>
                        <td className="col-num">{bookIndex + 1}</td>
                        {/* Front Image */}
                        <td>
                          <div className="admin-image-cell">
                            {book.frontImage && (
                              <>
                                <img
                                  src={book.frontImage}
                                  alt="Front"
                                  className="admin-image-preview"
                                />
                                <button
                                  className="admin-image-remove-btn"
                                  onClick={() =>
                                    updateBook(classIndex, bookIndex, "frontImage", "")
                                  }
                                >
                                  ✕ Remove
                                </button>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              ref={(el) =>
                                (fileInputRefs.current[`front_${classIndex}_${bookIndex}`] = el)
                              }
                              onChange={(e) =>
                                handleImageUpload(
                                  classIndex,
                                  bookIndex,
                                  "frontImage",
                                  e.target.files[0]
                                )
                              }
                            />
                            <button
                              className="admin-image-upload-btn"
                              onClick={() =>
                                triggerFileInput(`front_${classIndex}_${bookIndex}`)
                              }
                            >
                              📷 Upload
                            </button>
                          </div>
                        </td>
                        {/* Back Image */}
                        <td>
                          <div className="admin-image-cell">
                            {book.backImage && (
                              <>
                                <img
                                  src={book.backImage}
                                  alt="Back"
                                  className="admin-image-preview"
                                />
                                <button
                                  className="admin-image-remove-btn"
                                  onClick={() =>
                                    updateBook(classIndex, bookIndex, "backImage", "")
                                  }
                                >
                                  ✕ Remove
                                </button>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              ref={(el) =>
                                (fileInputRefs.current[`back_${classIndex}_${bookIndex}`] = el)
                              }
                              onChange={(e) =>
                                handleImageUpload(
                                  classIndex,
                                  bookIndex,
                                  "backImage",
                                  e.target.files[0]
                                )
                              }
                            />
                            <button
                              className="admin-image-upload-btn"
                              onClick={() =>
                                triggerFileInput(`back_${classIndex}_${bookIndex}`)
                              }
                            >
                              📷 Upload
                            </button>
                          </div>
                        </td>
                        {/* Book Name */}
                        <td>
                          <input
                            type="text"
                            value={book.name}
                            onChange={(e) =>
                              updateBook(classIndex, bookIndex, "name", e.target.value)
                            }
                            placeholder="Book Name"
                          />
                        </td>
                        {/* Price */}
                        <td>
                          <input
                            type="number"
                            value={book.price}
                            onChange={(e) =>
                              updateBook(
                                classIndex,
                                bookIndex,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="0"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        {/* Actions */}
                        <td className="col-actions">
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => removeBook(classIndex, bookIndex)}
                            title="Delete book"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Class Footer */}
                <div className="admin-class-footer">
                  <button
                    className="admin-btn admin-btn-primary admin-btn-sm"
                    onClick={() => addBook(classIndex)}
                  >
                    + Add Book
                  </button>
                  <div className="admin-class-total">
                    Total: <span>₹{getClassTotal(cls.books).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Save */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="admin-btn admin-btn-success" onClick={handleSave} style={{ padding: "14px 40px", fontSize: 16 }}>
              💾 Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* Save Toast */}
      {showToast && (
        <div className="admin-save-toast">✅ Changes saved successfully!</div>
      )}

      <Footer />
    </Fragment>
  );
};

export default AdminPage;
