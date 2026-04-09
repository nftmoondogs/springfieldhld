import { Link } from "react-router-dom";

const achieveList = [
  {
    iconClass: "icofont-rupee",
    title: "Transparent Fee Structure",
    desc: "Explore our affordable and transparent fee structure, designed to ensure quality education is accessible to all.",
    btnText: "View Fees",
    link: "/blog",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    bg: "#fffbeb",
    lightBg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
  },
  {
    iconClass: "icofont-book-alt",
    title: "Curated Book Lists",
    desc: "Discover the carefully selected list of books for each class, crafted to provide a comprehensive learning experience.",
    btnText: "Browse Books",
    link: "/about",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    bg: "#eff6ff",
    lightBg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
  },
];

const Achievement = () => {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div className="container">
        <div data-aos="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "#f5f3ff",
              border: "1px solid #ddd6fe",
              borderRadius: "100px",
              marginBottom: "16px",
            }}
          >
            <i className="icofont-flash" style={{ fontSize: "14px", color: "#7c3aed" }}></i>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#7c3aed",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Quick Access
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
            Everything You Need
          </h2>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "15px", maxWidth: "500px", margin: "8px auto 0" }}>
            Access fee details and book lists for all classes in one place.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {achieveList.map((item, i) => (
            <div className="col-md-6 col-lg-5" key={i}>
              <Link
                to={item.link}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                style={{
                  display: "block",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  background: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ height: "4px", background: item.gradient }} />
                <div style={{ padding: "32px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background: item.lightBg,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <i className={item.iconClass} style={{ fontSize: "24px", color: item.color }}></i>
                  </div>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                    }}
                  >
                    {item.desc}
                  </p>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: item.color,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {item.btnText}
                    <i className="icofont-arrow-right" style={{ fontSize: "14px" }}></i>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;
