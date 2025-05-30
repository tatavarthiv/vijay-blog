import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
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

          <nav className="main-nav">
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
                  to="/newsletter"
                  className={`nav-link ${
                    isActive("/newsletter") ? "active" : ""
                  }`}
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </nav>

          <div className="theme-toggle-container">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-label="Toggle theme"
            >
              <FiSun size={20} className="sun-icon" />
              <FiMoon size={20} className="moon-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
