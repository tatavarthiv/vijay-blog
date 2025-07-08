import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Twitter, Download } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleResumeDownload = () => {
    // You can replace this with your actual resume file path
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Vijay_Tatavarthi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="name-link">
              Vijay Tatavarthi
            </Link>
          </div>

          {/* Centered Navigation */}
          <nav className="main-nav desktop-nav">
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`nav-link ${
                    isActive("/projects") ? "active" : ""
                  }`}
                >
                  Projects
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Side Icons */}
          <div className="header-right">
            <div className="social-icons">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>

            <button
              className="resume-button desktop-resume-button"
              onClick={handleResumeDownload}
              aria-label="Download Resume"
            >
              <Download size={18} />
              Resume
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mobile-menu-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>

            <nav className="mobile-nav">
              <ul className="mobile-nav-links">
                <li>
                  <Link
                    to="/"
                    className={`mobile-nav-link ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`mobile-nav-link ${
                      isActive("/about") ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className={`mobile-nav-link ${
                      isActive("/blog") ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className={`mobile-nav-link ${
                      isActive("/projects") ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mobile-social-icons">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>

            <button
              className="resume-button mobile-resume-button"
              onClick={handleResumeDownload}
              aria-label="Download Resume"
            >
              <Download size={18} />
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
