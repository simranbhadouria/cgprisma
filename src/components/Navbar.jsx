import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronDown,
    Shield,
    Cloud,
    Monitor,
    Building2,
    Briefcase,
    Menu,
    X
} from "lucide-react";

function Navbar() {

    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [platformOpen, setPlatformOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="navbar">

            {/* Logo + Mobile Menu Button */}
            <div className="navbar-top">

                <div className="logo">
                    Cynox Global
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

            </div>


            {/* Menu */}
            <div className={`nav-menu ${mobileOpen ? "mobile-open" : ""}`}>

                <Link
                    className="nav-item"
                    to="/"
                    onClick={() => setMobileOpen(false)}
                >
                    Home
                </Link>


                {/* Solutions */}
                <div
                    className="nav-item dropdown"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                >

                    <Link
                        to="/solutions"
                        className="nav-item"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Solutions
                    </Link>

                    <ChevronDown size={16} />

                    {solutionsOpen && (
                        <div className="dropdown-menu">

                            <Link to="/soc-service">
                                <Shield size={18} />
                                SOC Service
                            </Link>

                            <Link to="/cyber-security">
                                <Shield size={18} />
                                Cyber Security
                            </Link>

                            <Link to="/cloud-security">
                                <Cloud size={18} />
                                Cloud Security
                            </Link>

                        </div>
                    )}

                </div>


                {/* Platform */}
                <div
                    className="nav-item dropdown"
                    onMouseEnter={() => setPlatformOpen(true)}
                    onMouseLeave={() => setPlatformOpen(false)}
                >

                    <Link
                        to="/platform"
                        className="nav-item"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        Platform
                    </Link>

                    <ChevronDown size={16} />

                    {platformOpen && (
                        <div className="dropdown-menu">

                            <Link to="/platform">
                                <Monitor size={18} />
                                Security Platform
                            </Link>

                            <Link to="/monitoring">
                                <Monitor size={18} />
                                Monitoring
                            </Link>

                        </div>
                    )}

                </div>


                {/* About */}
                <div
                    className="nav-item dropdown"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                >

                    <Link
                        to="/about"
                        className="nav-item"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        About
                    </Link>

                    <ChevronDown size={16} />

                    {aboutOpen && (
                        <div className="dropdown-menu">

                            <Link to="/about">
                                <Building2 size={18} />
                                Company
                            </Link>

                            <Link to="/careers">
                                <Briefcase size={18} />
                                Careers
                            </Link>

                        </div>
                    )}

                </div>


                <Link className="nav-item" to="/datasheets">
                    Datasheets
                </Link>

                <Link className="nav-item" to="/blog">
                    Blog
                </Link>

            </div>


            {/* Contact Button */}
            <div className="navbar-contact">

                <Link
                    className="contact-btn"
                    to="/contact"
                >
                    Contact Us
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;