import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

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
            <ul>
              <li>
                <Link to="/blog" className={isActive("/blog") ? "active" : ""}>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={isActive("/projects") ? "active" : ""}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/about") ? "active" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                {/* Newsletter link could open a modal or go to a separate page */}
                <Link
                  to="/newsletter"
                  className={isActive("/newsletter") ? "active" : ""}
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
