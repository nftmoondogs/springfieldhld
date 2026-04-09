import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="news-footer-wrap">
      <footer>
        <div
          style={{
            background: "#0f172a",
            padding: "48px 0 0",
          }}
        >
          <div className="container">
            <div className="row g-4" style={{ paddingBottom: "36px", borderBottom: "1px solid #1e293b" }}>
              {/* School info */}
              <div className="col-lg-4 col-md-6">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <img
                    src="assets/images/logo/01.png"
                    alt="logo"
                    style={{ height: "48px", width: "auto" }}
                  />
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>
                      Spring Field
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
                      Junior High School
                    </div>
                  </div>
                </div>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7 }}>
                  Nurturing young minds to shape a bright future. Recognized institution offering
                  quality education from Nursery to Class VIII.
                </p>
              </div>

              {/* Quick Links */}
              <div className="col-lg-2 col-md-6">
                <h5 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                  Quick Links
                </h5>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    { text: "Home", link: "/" },
                    { text: "Courses", link: "/about" },
                    { text: "Fee Structure", link: "/blog" },
                    { text: "Contact", link: "/contact" },
                  ].map((item, i) => (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      <Link
                        to={item.link}
                        style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.target.style.color = "#f59e0b")}
                        onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="col-lg-3 col-md-6">
                <h5 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                  Contact
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <i className="icofont-location-pin" style={{ color: "#f59e0b", fontSize: "16px", marginTop: "3px" }}></i>
                    <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>
                      Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="icofont-phone" style={{ color: "#f59e0b", fontSize: "16px" }}></i>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>+91 8881177767</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <i className="icofont-email" style={{ color: "#f59e0b", fontSize: "16px" }}></i>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>springfieldhld@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* School Hours */}
              <div className="col-lg-3 col-md-6">
                <h5 style={{ color: "#fff", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                  School Hours
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { day: "Monday - Friday", time: "8:00 AM - 2:00 PM" },
                    { day: "Saturday", time: "8:00 AM - 12:00 PM" },
                    { day: "Sunday", time: "Closed" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        background: "#1e293b",
                        borderRadius: "8px",
                      }}
                    >
                      <span style={{ color: "#94a3b8", fontSize: "13px" }}>{item.day}</span>
                      <span style={{ color: "#f59e0b", fontSize: "13px", fontWeight: 600 }}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
                &copy; 2026 Spring Field Junior High School. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
