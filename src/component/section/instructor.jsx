const contactList = [
  {
    iconClass: "icofont-location-pin",
    title: "Address",
    desc: "Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand",
    color: "#dc2626",
    bg: "#fee2e2",
  },
  {
    iconClass: "icofont-phone",
    title: "Phone",
    desc: "+91 8881177767",
    color: "#059669",
    bg: "#dcfce7",
  },
  {
    iconClass: "icofont-email",
    title: "Email",
    desc: "springfieldhld@gmail.com",
    color: "#2563eb",
    bg: "#dbeafe",
  },
  {
    iconClass: "icofont-globe",
    title: "Website",
    desc: "www.springfieldhld.com",
    color: "#7c3aed",
    bg: "#f3e8ff",
  },
];

const Instructor = () => {
  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: "100px",
              marginBottom: "16px",
            }}
          >
            <i className="icofont-phone" style={{ fontSize: "14px", color: "#d97706" }}></i>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#d97706",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Get In Touch
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            Contact Us
          </h2>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "15px" }}>
            Reach out through any of the channels below.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div
              data-aos="fade-right"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12)",
                height: "100%",
                minHeight: "320px",
                position: "relative",
              }}
            >
              <img
                src="assets/images/choose/01.png"
                alt="School Location"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "120px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                  borderRadius: "0 0 20px 20px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "24px",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: 700 }}>
                  <i className="icofont-location-pin" style={{ marginRight: "6px" }}></i>
                  Haldwani, Uttrakhand
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
              {contactList.map((item, i) => (
                <div
                  key={i}
                  data-aos="fade-left"
                  data-aos-delay={i * 100}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px",
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    flex: 1,
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: item.bg,
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={item.iconClass}
                      style={{ fontSize: "20px", color: item.color }}
                    ></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1e293b",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
