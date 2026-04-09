import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const phoneNumber = "+918881177767";
const address = "Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand ";

const Header = ({ hidelogo }) => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFiexd, setHeaderFiexd] = useState(false);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            setHeaderFiexd(true);
        } else {
            setHeaderFiexd(false);
        }
    });

    return (
        <header className={`header-section ${headerFiexd ? "header-fixed fadeInUp" : ""}`}>
            <div className={`header-top ${socialToggle ? "open" : ""}`}>
                <div className="container">
                    <div className="header-top-area">
                        <ul className="lab-ul left">
                            <li style={{ color: "#fff" }}>
                                <i className="icofont-ui-call" style={{ color: "#f59e0b" }}></i>{" "}
                                <span style={{ color: "#e2e8f0" }}>{phoneNumber}</span>
                            </li>
                            <li style={{ color: "#fff" }}>
                                <i className="icofont-location-pin" style={{ color: "#f59e0b" }}></i>{" "}
                                <span style={{ color: "#e2e8f0" }}>{address}</span>
                            </li>
                        </ul>
                        <ul className="lab-ul social-icons d-flex align-items-center">
                        </ul>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper">
                        {hidelogo ? (
                            <div className="logo" style={{ visibility: "hidden", width: 0, overflow: "hidden" }}>
                                <Link to="/"><img src="assets/images/logo/01.png" alt="logo" /></Link>
                            </div>
                        ) : (
                            <div className="logo">
                                <Link to="/"><img src="assets/images/logo/01.png" alt="logo" /></Link>
                            </div>
                        )}
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><NavLink to="/" style={{ color: "#1e293b" }}>Home</NavLink></li>
                                    <li><NavLink to="/about" style={{ color: "#1e293b" }}>Course</NavLink></li>
                                    <li><NavLink to="/blog" style={{ color: "#1e293b" }}>Fee Structure</NavLink></li>
                                    <li><NavLink to="/contact" style={{ color: "#1e293b" }}>Contact</NavLink></li>
                                </ul>
                            </div>

                            <div className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`} onClick={() => setMenuToggle(!menuToggle)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="ellepsis-bar d-lg-none" onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
