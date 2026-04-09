import { Link } from "react-router-dom";
import CountUp from "react-countup";

const stats = [
  { num: 15, suffix: "+", label: "Years of Excellence" },
  { num: 500, suffix: "+", label: "Students Enrolled" },
  { label: "Classes Available", text: "VIII" },
];

const Banner = () => {
  return (
    <section
      className="banner-section"
      style={{
        background: "linear-gradient(135deg, #fffbeb 0%, #fff 40%, #f0f9ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background shapes */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-center" style={{ minHeight: "70vh" }}>
          <div className="col-lg-6">
            <div data-aos="fade-right" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: "100px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#f59e0b",
                    borderRadius: "50%",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    color: "#b45309",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Nurturing Young Minds
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                Spring Field
                <span style={{ display: "block", color: "#f59e0b", marginTop: "4px" }}>
                  Junior High School
                </span>
              </h1>

              <p
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  maxWidth: "500px",
                }}
              >
                Welcome to Spring Field Junior High School, where we nurture young minds to shape a
                bright future. Located in Haldwani, Uttrakhand — offering a comprehensive experience
                for Nursery to Class VIII.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
                <Link
                  to="/about"
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#fff",
                    padding: "14px 32px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="icofont-book-alt" style={{ fontSize: "16px" }}></i>
                  View Book Lists
                </Link>
                <Link
                  to="/blog"
                  style={{
                    backgroundColor: "#fff",
                    color: "#334155",
                    padding: "14px 32px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    border: "2px solid #e2e8f0",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="icofont-rupee" style={{ fontSize: "16px" }}></i>
                  Fee Structure
                </Link>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0",
                  paddingTop: "28px",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                {stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      textAlign: i === 0 ? "left" : "center",
                      borderLeft: i > 0 ? "1px solid #e2e8f0" : "none",
                      paddingLeft: i > 0 ? "20px" : "0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: 800,
                        color: "#0f172a",
                        lineHeight: 1,
                      }}
                    >
                      {s.text ? (
                        s.text
                      ) : (
                        <CountUp end={s.num} duration={2.5} suffix={s.suffix} />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        fontWeight: 500,
                        marginTop: "6px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div data-aos="fade-left" data-aos-delay="200" style={{ position: "relative", padding: "20px" }}>
              {/* Decorative frame behind image */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "70%",
                  height: "70%",
                  borderRadius: "24px",
                  border: "3px solid #fde68a",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 32px 64px -16px rgba(0,0,0,0.15)",
                  zIndex: 1,
                }}
              >
                <img
                  src="assets/images/banner/02.png"
                  alt="Spring Field Junior High School"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {/* Small floating accent card */}
              <div
                data-aos="zoom-in"
                data-aos-delay="500"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "0",
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "14px 20px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#dcfce7",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className="icofont-graduate-alt" style={{ fontSize: "18px", color: "#16a34a" }}></i>
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                    Nursery - VIII
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>
                    All Classes Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default Banner;
