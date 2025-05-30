import React from "react";

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Me</h1>

      <section className="about-section">
        <p>
          Welcome to my personal blog where I share my thoughts, projects, and
          technical content. I'm passionate about technology and love to explore
          new ideas and share what I learn along the way.
        </p>
      </section>

      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>HTML/CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>

          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>APIs</li>
              <li>Databases</li>
            </ul>
          </div>

          <div className="skill-category">
            <h3>Other</h3>
            <ul>
              <li>Git</li>
              <li>CI/CD</li>
              <li>Testing</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact</h2>
        <p>
          Feel free to reach out to me for collaborations, questions, or just to
          say hello!
        </p>
        <div className="contact-links">
          {/* Replace with your actual contact information */}
          <a href="mailto:your.email@example.com">Email</a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
