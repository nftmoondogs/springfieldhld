import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../component/layout/footer";
import BookList from "../component/section/BookList";

const AboutPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <Fragment>
      {/* Custom page header */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "40px 0 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative shapes */}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
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
              <i className="icofont-book-alt" style={{ fontSize: "14px", color: "#fbbf24" }}></i>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fbbf24",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Academic Resources
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
              Book Lists
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
              Complete book lists for all classes with pricing details
            </p>
          </div>
        </div>
      </section>
      <BookList />
      <Footer />
    </Fragment>
  );
};

export default AboutPage;
