import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../component/layout/footer";
import { getFeeData, getFeeYears, migrateFeeData } from "../data/feeData";

const BlogPage = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await migrateFeeData();
      const available = await getFeeYears();
      setYears(available);
      if (available.length > 0) setSelectedYear(available[0]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await getFeeData(selectedYear);
      setFeeData(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedYear]);

  return (
    <Fragment>
      {/* Page Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "40px 0 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Back button */}
          <div style={{ marginBottom: "24px" }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                color: "#e2e8f0",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              <i className="icofont-arrow-left" style={{ fontSize: "14px" }}></i>
              Back to Home
            </Link>
          </div>

          <div data-aos="fade-up" style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: "100px",
                marginBottom: "16px",
              }}
            >
              <i className="icofont-rupee" style={{ fontSize: "14px", color: "#fbbf24" }}></i>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fbbf24",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Fee Details
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}
            >
              Fee Structure
            </h1>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "16px",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Transparent and affordable fee structure for all classes
            </p>
          </div>
        </div>
      </section>

      {/* Fee Content */}
      <div style={{ background: "#f8fafc", padding: "40px 0 60px" }}>
        <div className="container">
          {loading && years.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
              <div style={{ width: 48, height: 48, border: "4px solid #e2e8f0", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            </div>
          ) : years.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: 64, height: 64, background: "#f1f5f9", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <i className="icofont-rupee" style={{ fontSize: "28px", color: "#94a3b8" }}></i>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "16px", fontWeight: 500 }}>Fee structure not available yet.</p>
            </div>
          ) : (
            <>
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

              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
                  <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                </div>
              ) : !feeData ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <p style={{ color: "#94a3b8", fontSize: "16px" }}>No data for {selectedYear}</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div
                    data-aos="fade-up"
                    className="d-none d-md-block"
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                            <th
                              style={{
                                padding: "16px 20px",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#fbbf24",
                                textTransform: "uppercase",
                                letterSpacing: "1.5px",
                                textAlign: "left",
                                borderRight: "1px solid rgba(255,255,255,0.08)",
                                minWidth: "180px",
                              }}
                            >
                              Fee Category
                            </th>
                            {feeData.classes.map((cls, i) => (
                              <th
                                key={i}
                                style={{
                                  padding: "16px 12px",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "#fff",
                                  textTransform: "uppercase",
                                  letterSpacing: "1px",
                                  textAlign: "center",
                                  borderRight: i < feeData.classes.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                  minWidth: "90px",
                                }}
                              >
                                {cls}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {feeData.feeCategories.map((cat, rowIdx) => (
                            <tr
                              key={cat.id}
                              style={{
                                background: rowIdx % 2 === 0 ? "#fff" : "#f8fafc",
                                borderBottom: "1px solid #f1f5f9",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#fffbeb"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = rowIdx % 2 === 0 ? "#fff" : "#f8fafc"; }}
                            >
                              <td
                                style={{
                                  padding: "14px 20px",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "#334155",
                                  borderRight: "1px solid #f1f5f9",
                                }}
                              >
                                {cat.name}
                              </td>
                              {feeData.classes.map((cls, colIdx) => (
                                <td
                                  key={colIdx}
                                  style={{
                                    padding: "14px 12px",
                                    textAlign: "center",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    color: cat.fees[cls] ? "#0f172a" : "#d1d5db",
                                    borderRight: colIdx < feeData.classes.length - 1 ? "1px solid #f1f5f9" : "none",
                                  }}
                                >
                                  {cat.fees[cls] ? `₹${parseFloat(cat.fees[cls]).toLocaleString("en-IN")}` : "—"}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {/* Total row */}
                          <tr style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                            <td
                              style={{
                                padding: "16px 20px",
                                fontSize: "13px",
                                fontWeight: 800,
                                color: "#fff",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                              }}
                            >
                              Total
                            </td>
                            {feeData.classes.map((cls, i) => {
                              const total = feeData.feeCategories.reduce((s, c) => s + (parseFloat(c.fees[cls]) || 0), 0);
                              return (
                                <td
                                  key={i}
                                  style={{
                                    padding: "16px 12px",
                                    textAlign: "center",
                                    fontSize: "17px",
                                    fontWeight: 800,
                                    color: "#fbbf24",
                                  }}
                                >
                                  {total > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="d-md-none">
                    <div className="row g-3">
                      {feeData.classes.map((cls, i) => {
                        const total = feeData.feeCategories.reduce((s, c) => s + (parseFloat(c.fees[cls]) || 0), 0);
                        if (total === 0) return null;
                        return (
                          <div className="col-sm-6" key={i}>
                            <div
                              data-aos="fade-up"
                              data-aos-delay={i * 80}
                              style={{
                                background: "#fff",
                                borderRadius: "20px",
                                overflow: "hidden",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                              }}
                            >
                              {/* Card header */}
                              <div
                                style={{
                                  background: "linear-gradient(135deg, #0f172a, #1e293b)",
                                  padding: "16px 20px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                      borderRadius: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <i className="icofont-graduate-alt" style={{ fontSize: "16px", color: "#fff" }}></i>
                                  </div>
                                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "0.5px" }}>
                                    {cls}
                                  </h3>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <p style={{ fontSize: "9px", color: "#94a3b8", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>Total</p>
                                  <p style={{ fontSize: "16px", fontWeight: 800, color: "#fbbf24", margin: 0 }}>₹{total.toLocaleString("en-IN")}</p>
                                </div>
                              </div>

                              {/* Fee items */}
                              <div style={{ padding: "12px 16px" }}>
                                {feeData.feeCategories.map((cat) =>
                                  cat.fees[cls] ? (
                                    <div
                                      key={cat.id}
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "10px 4px",
                                        borderBottom: "1px solid #f1f5f9",
                                      }}
                                    >
                                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>{cat.name}</span>
                                      <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                                        ₹{parseFloat(cat.fees[cls]).toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  {feeData.notes && (
                    <div
                      data-aos="fade-up"
                      style={{
                        marginTop: "32px",
                        background: "#fffbeb",
                        border: "1px solid #fde68a",
                        borderRadius: "16px",
                        padding: "24px",
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "#fef3c7",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <i className="icofont-info-circle" style={{ fontSize: "18px", color: "#d97706" }}></i>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#92400e", marginBottom: "6px" }}>Notes</h4>
                        <p style={{ fontSize: "14px", color: "#a16207", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                          {feeData.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Fragment>
  );
};

export default BlogPage;
