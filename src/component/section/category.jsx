const values = [
  { iconClass: "icofont-bullseye", label: "Critical Thinking", color: "#059669", bg: "#dcfce7" },
  { iconClass: "icofont-globe", label: "Global Outlook", color: "#2563eb", bg: "#dbeafe" },
  { iconClass: "icofont-idea", label: "Innovation", color: "#d97706", bg: "#fef3c7" },
  { iconClass: "icofont-handshake-deal", label: "Empathy", color: "#dc2626", bg: "#fee2e2" },
];

const Category = () => {
  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-lg-2">
            <div data-aos="fade-left" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  right: "-12px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  opacity: 0.12,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12)",
                  zIndex: 1,
                }}
              >
                <img
                  src="assets/images/banner/01.png"
                  alt="Our Vision"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-lg-1">
            <div data-aos="fade-right" data-aos-delay="100">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  borderRadius: "100px",
                  marginBottom: "16px",
                }}
              >
                <i className="icofont-eye-alt" style={{ fontSize: "14px", color: "#059669" }}></i>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#059669",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  Our Vision
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "24px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Shaping Tomorrow's{" "}
                <span style={{ color: "#059669" }}>Leaders</span>
              </h2>

              <div style={{ color: "#475569", lineHeight: 1.8, fontSize: "15px" }}>
                <p style={{ marginBottom: "16px" }}>
                  At Spring Field Junior High School, we strive to cultivate a community of lifelong
                  learners, prepared to excel in a constantly evolving global landscape. Our vision
                  encompasses fostering intellectual curiosity, critical thinking, empathy, and
                  resilience in our students.
                </p>
                <p style={{ marginBottom: "0" }}>
                  Through our dedicated faculty and staff, we deliver a comprehensive education
                  tailored to individual strengths and interests. By embracing diversity and
                  inclusivity, we aim to prepare our students to thrive in a multicultural world.
                </p>
              </div>

              {/* Values Grid */}
              <div className="row g-3" style={{ marginTop: "28px" }}>
                {values.map((item, i) => (
                  <div className="col-6" key={i}>
                    <div
                      data-aos="zoom-in"
                      data-aos-delay={150 + i * 100}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        background: "#fff",
                        borderRadius: "14px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          background: item.bg,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <i className={item.iconClass} style={{ fontSize: "16px", color: item.color }}></i>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#334155" }}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
