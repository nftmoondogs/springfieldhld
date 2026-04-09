import { useState, useEffect } from "react";
import { getBookData, getAvailableYears, getClassTotal, migrateOldData } from "../../data/bookData";

const BookList = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [collapsedClasses, setCollapsedClasses] = useState({});

  const toggleClass = (id) => {
    setCollapsedClasses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchYears = async () => {
      setLoading(true);
      await migrateOldData();
      const availableYears = await getAvailableYears();
      setYears(availableYears);
      if (availableYears.length > 0) {
        setSelectedYear(availableYears[0]);
      }
      setLoading(false);
    };
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await getBookData(selectedYear);
      setBookData(data);
      setCollapsedClasses({});
      setLoading(false);
    };
    fetchData();
  }, [selectedYear]);

  if (loading && years.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "4px solid #e2e8f0", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#64748b", fontWeight: 500, fontSize: "16px" }}>Loading book lists...</p>
        </div>
      </div>
    );
  }

  if (years.length === 0) {
    return (
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#f1f5f9", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <i className="icofont-book-alt" style={{ fontSize: "28px", color: "#94a3b8" }}></i>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 500 }}>No book lists available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f8fafc", padding: "40px 0 60px" }}>
      <div className="container">
        {/* Year Selector */}
        <div data-aos="fade-up" style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Select Academic Year
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "14px",
                  border: "2px solid",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  ...(selectedYear === year
                    ? {
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        color: "#fff",
                        borderColor: "#f59e0b",
                        boxShadow: "0 8px 20px rgba(245,158,11,0.3)",
                      }
                    : {
                        background: "#fff",
                        color: "#475569",
                        borderColor: "#e2e8f0",
                      }),
                }}
              >
                <i className="icofont-calendar" style={{ marginRight: "6px" }}></i>
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        ) : !bookData ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "#94a3b8", fontSize: "16px" }}>No data found for {selectedYear}</p>
          </div>
        ) : (
          /* Classes Grid */
          <div className="row g-4">
            {bookData.classes.map((cls, classIdx) => {
              const total = getClassTotal(cls.books);
              const isExpanded = !collapsedClasses[cls.id];

              return (
                <div className="col-lg-6" key={cls.id}>
                  <div
                    data-aos="fade-up"
                    data-aos-delay={classIdx * 80}
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"; }}
                  >
                    {/* Class Header */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #0f172a, #1e293b)",
                        padding: "20px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleClass(cls.id)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            background: "linear-gradient(135deg, #f59e0b, #d97706)",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <i className="icofont-book-alt" style={{ fontSize: "18px", color: "#fff" }}></i>
                        </div>
                        <div>
                          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "0.5px" }}>
                            {cls.name}
                          </h3>
                          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, marginTop: "2px" }}>
                            {cls.books.length} {cls.books.length === 1 ? "book" : "books"} &middot; {selectedYear}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>Total</p>
                          <p style={{ fontSize: "18px", fontWeight: 800, color: "#fbbf24", margin: 0 }}>
                            ₹{total.toFixed(0)}
                          </p>
                        </div>
                        <i
                          className={isExpanded ? "icofont-rounded-up" : "icofont-rounded-down"}
                          style={{ fontSize: "20px", color: "#64748b", transition: "transform 0.3s" }}
                        ></i>
                      </div>
                    </div>

                    {/* Book List - always visible on desktop, collapsible concept but shown */}
                    <div style={{ maxHeight: isExpanded ? "2000px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
                      {/* Mobile Card View */}
                      <div className="d-sm-none">
                        {cls.books.map((book, idx) => (
                          <div
                            key={book.id}
                            style={{
                              padding: "14px 16px",
                              borderBottom: idx < cls.books.length - 1 ? "1px solid #f1f5f9" : "none",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                background: "#f1f5f9",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#94a3b8",
                                flexShrink: 0,
                                marginTop: "2px",
                              }}
                            >
                              {idx + 1}
                            </span>

                            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                              {book.frontImage ? (
                                <img
                                  src={book.frontImage}
                                  alt={`${book.name} front`}
                                  style={{
                                    width: "44px",
                                    height: "58px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreviewImage(book.frontImage)}
                                />
                              ) : (
                                <div style={{ width: 44, height: 58, background: "#f1f5f9", borderRadius: 8, border: "1px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <i className="icofont-image" style={{ fontSize: "14px", color: "#cbd5e1" }}></i>
                                </div>
                              )}
                              {book.backImage ? (
                                <img
                                  src={book.backImage}
                                  alt={`${book.name} back`}
                                  style={{
                                    width: "44px",
                                    height: "58px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreviewImage(book.backImage)}
                                />
                              ) : (
                                <div style={{ width: 44, height: 58, background: "#f1f5f9", borderRadius: 8, border: "1px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <i className="icofont-image" style={{ fontSize: "14px", color: "#cbd5e1" }}></i>
                                </div>
                              )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "12px", fontWeight: 600, color: "#334155", textTransform: "uppercase", letterSpacing: "0.3px", lineHeight: 1.4, margin: 0 }}>
                                {book.name}
                              </p>
                              <p style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginTop: "4px", margin: 0 }}>
                                ₹{book.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Table View */}
                      <div className="d-none d-sm-block" style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                              <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", width: "48px" }}>#</th>
                              <th style={{ padding: "12px 12px", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", width: "80px" }}>Front</th>
                              <th style={{ padding: "12px 12px", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", width: "80px" }}>Back</th>
                              <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", textAlign: "left" }}>Book Name</th>
                              <th style={{ padding: "12px 16px", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", textAlign: "right", width: "90px" }}>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cls.books.map((book, idx) => (
                              <tr
                                key={book.id}
                                style={{
                                  borderBottom: "1px solid #f1f5f9",
                                  transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#fffbeb"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                              >
                                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                  <span style={{ width: 26, height: 26, background: "#f1f5f9", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#94a3b8" }}>
                                    {idx + 1}
                                  </span>
                                </td>
                                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                                  {book.frontImage ? (
                                    <img
                                      src={book.frontImage}
                                      alt={`${book.name} front`}
                                      style={{
                                        width: 52,
                                        height: 66,
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        border: "2px solid #e2e8f0",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                      }}
                                      onClick={() => setPreviewImage(book.frontImage)}
                                      onMouseEnter={(e) => { e.target.style.transform = "scale(1.08)"; e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)"; }}
                                      onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
                                    />
                                  ) : (
                                    <div style={{ width: 52, height: 66, background: "#f8fafc", borderRadius: 10, border: "2px dashed #e2e8f0", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                      <i className="icofont-image" style={{ fontSize: "16px", color: "#d1d5db" }}></i>
                                    </div>
                                  )}
                                </td>
                                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                                  {book.backImage ? (
                                    <img
                                      src={book.backImage}
                                      alt={`${book.name} back`}
                                      style={{
                                        width: 52,
                                        height: 66,
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        border: "2px solid #e2e8f0",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                      }}
                                      onClick={() => setPreviewImage(book.backImage)}
                                      onMouseEnter={(e) => { e.target.style.transform = "scale(1.08)"; e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)"; }}
                                      onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
                                    />
                                  ) : (
                                    <div style={{ width: 52, height: 66, background: "#f8fafc", borderRadius: 10, border: "2px dashed #e2e8f0", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                      <i className="icofont-image" style={{ fontSize: "16px", color: "#d1d5db" }}></i>
                                    </div>
                                  )}
                                </td>
                                <td style={{ padding: "12px 16px" }}>
                                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#334155", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                                    {book.name}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>
                                    ₹{book.price}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                              <td colSpan="4" style={{ padding: "14px 20px", fontSize: "13px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "2px", textAlign: "right" }}>
                                Total
                              </td>
                              <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "17px", fontWeight: 800, color: "#fbbf24" }}>
                                ₹{total.toFixed(0)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* Mobile Total */}
                      <div
                        className="d-sm-none"
                        style={{
                          background: "linear-gradient(135deg, #0f172a, #1e293b)",
                          padding: "14px 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "2px" }}>Total</span>
                        <span style={{ fontSize: "17px", fontWeight: 800, color: "#fbbf24" }}>₹{total.toFixed(0)}</span>
                      </div>
                    </div>

                    {/* Collapsed state - click to expand prompt */}
                    {!isExpanded && (
                      <div
                        style={{
                          padding: "14px 24px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: "#f8fafc",
                          borderTop: "1px solid #e2e8f0",
                          transition: "background 0.2s",
                        }}
                        onClick={() => toggleClass(cls.id)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                      >
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#f59e0b" }}>
                          <i className="icofont-eye" style={{ marginRight: "6px" }}></i>
                          View {cls.books.length} {cls.books.length === 1 ? "book" : "books"}
                          <span style={{ color: "#94a3b8", fontWeight: 500 }}> &middot; Total ₹{total.toFixed(0)}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "16px",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div style={{ position: "relative", maxWidth: "95vw", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#fff",
                border: "none",
                color: "#334155",
                fontSize: "18px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                zIndex: 10001,
                transition: "all 0.2s",
              }}
              onClick={() => setPreviewImage(null)}
              onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#334155"; }}
            >
              <i className="icofont-close-line"></i>
            </button>
            <img
              src={previewImage}
              alt="Book preview"
              style={{
                maxWidth: "95vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "16px",
                boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BookList;
