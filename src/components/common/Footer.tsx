import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p>© {currentYear} Vijay Tatavarthi. All rights reserved.</p>
          </div>

          <div className="footer-links">
            <ul>
              <li>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tatavarthiv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/vijay-tatavarthi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
