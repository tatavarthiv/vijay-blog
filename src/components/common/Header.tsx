import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { Sunrise, Sunset, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
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

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="name-link">
              Vijay Tatavarthi
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Desktop Navigation */}
            <nav className="main-nav desktop-nav">
              <ul className="nav-links">
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

            <div className="theme-toggle-container desktop-theme-toggle">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Sunrise size={20} />
                ) : (
                  <Sunset size={20} />
                )}
              </button>
            </div>

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

            <div className="mobile-theme-toggle-container">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Sunrise size={20} />
                ) : (
                  <Sunset size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
