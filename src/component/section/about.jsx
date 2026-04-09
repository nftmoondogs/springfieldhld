const About = () => {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div data-aos="fade-right" style={{ position: "relative" }}>
              {/* Decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "-12px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  opacity: 0.15,
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
                  src="assets/images/about/01.png"
                  alt="Principal"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              {/* Experience badge */}
              <div
                data-aos="zoom-in"
                data-aos-delay="300"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-10px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#fff",
                  borderRadius: "16px",
                  padding: "16px 22px",
                  boxShadow: "0 12px 32px rgba(245,158,11,0.3)",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>15+</div>
                <div style={{ fontSize: "11px", fontWeight: 600, opacity: 0.9, marginTop: "4px" }}>
                  Years
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div data-aos="fade-left" data-aos-delay="100">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: "100px",
                  marginBottom: "16px",
                }}
              >
                <i className="icofont-teacher" style={{ fontSize: "14px", color: "#ea580c" }}></i>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ea580c",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  From the Principal's Desk
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
                Principal's Message
              </h2>

              <div style={{ color: "#475569", lineHeight: 1.8, fontSize: "15px" }}>
                <p style={{ marginBottom: "16px" }}>
                  Welcome to Spring Field Junior High School, an institution committed to academic
                  excellence and student empowerment. Our dedicated faculty and staff strive to
                  provide a comprehensive education tailored to individual needs, fostering both
                  intellectual growth and personal development.
                </p>
                <p style={{ marginBottom: "0" }}>
                  We pride ourselves on nurturing a diverse and vibrant learning community, equipped
                  with great facilities and a dynamic curriculum. I encourage you to explore our
                  website and learn about the enriching opportunities Spring Field Junior High School
                  offers.
                </p>
              </div>

              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "24px",
                  borderTop: "1px solid #f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className="icofont-pen-alt-2" style={{ fontSize: "20px", color: "#fff" }}></i>
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: 700,
                      color: "#1e293b",
                      fontSize: "17px",
                      marginBottom: "2px",
                    }}
                  >
                    Nighat Parveen
                  </p>
                  <p style={{ color: "#d97706", fontSize: "13px", fontWeight: 600, margin: 0 }}>
                    Principal, Spring Field Junior High School
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
