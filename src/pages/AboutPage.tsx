import headshot from "../assets/headshot.JPG?url";

export default function AboutPage() {
  return (
    <div className="about-page container">
      <h1 className="main-title">VIJAY TATAVARTHI</h1>

      {/* Top section with headshot on left, about me on right */}
      <div
        className="about-intro"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
      >
        {/* Left column - headshot */}
        <div className="headshot-container">
          <img
            src={headshot}
            alt="Vijay Tatavarthi"
            className="headshot-image"
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Right column - about me */}
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            Welcome to my personal blog where I share my thoughts, projects, and
            technical content. I'm passionate about technology and love to
            explore new ideas and share what I learn along the way.
          </p>
          <p>
            I specialize in web development with a focus on creating responsive,
            accessible, and performant applications using modern technologies.
          </p>
        </div>
      </div>

      {/* Skills section with tags in rows */}
      <section className="skills-section">
        <h2>Skills</h2>
        <div
          className="skills-tags"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {/* Frontend Skills */}
          <span className="tag tag-react">React</span>
          <span className="tag tag-typescript">TypeScript</span>
          <span className="tag tag-javascript">JavaScript</span>
          <span className="tag tag-frontend">HTML/CSS</span>

          {/* Backend Skills */}
          <span className="tag tag-frameworks">Node.js</span>
          <span className="tag tag-frameworks">Express</span>
          <span className="tag tag-tools">APIs</span>
          <span className="tag tag-software-development">Databases</span>

          {/* Other Skills */}
          <span className="tag tag-tools">Git</span>
          <span className="tag tag-best-practices">CI/CD</span>
          <span className="tag tag-best-practices">Testing</span>
          <span className="tag tag-software-development">Performance</span>
        </div>
      </section>

      {/* Experience section */}
      <section className="experience-section" style={{ marginTop: "3rem" }}>
        <h2>Experience</h2>

        <div className="experience-item" style={{ marginTop: "1.5rem" }}>
          <h3>Senior Frontend Developer</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Tech Company Inc. | 2020 - Present
          </p>
          <ul>
            <li>
              Led the development of responsive web applications using React and
              TypeScript
            </li>
            <li>
              Implemented performance optimizations resulting in a 30% increase
              in page load speed
            </li>
            <li>
              Collaborated with UX designers to create accessible user
              interfaces
            </li>
          </ul>
        </div>

        <div className="experience-item" style={{ marginTop: "1.5rem" }}>
          <h3>Web Developer</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Digital Solutions LLC | 2017 - 2020
          </p>
          <ul>
            <li>
              Developed and maintained client websites using JavaScript and
              modern frameworks
            </li>
            <li>Built RESTful APIs using Node.js and Express</li>
            <li>
              Implemented automated testing strategies to improve code quality
            </li>
          </ul>
        </div>
      </section>

      {/* Education section */}
      <section className="education-section" style={{ marginTop: "3rem" }}>
        <h2>Education</h2>

        <div className="education-item" style={{ marginTop: "1.5rem" }}>
          <h3>Master's in Computer Science</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            University of Technology | 2015 - 2017
          </p>
          <p>Specialized in Web Technologies and Software Engineering</p>
        </div>

        <div className="education-item" style={{ marginTop: "1.5rem" }}>
          <h3>Bachelor's in Software Engineering</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            State University | 2011 - 2015
          </p>
          <p>Graduated with honors, Dean's list</p>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section" style={{ marginTop: "3rem" }}>
        <h2>Contact</h2>
        <p>
          Feel free to reach out to me for collaborations, questions, or just to
          say hello!
        </p>
        <div className="contact-links">
          {/* Replace with your actual contact information */}
          <a href="mailto:your.email@example.com">Email</a>
          <a
            href="https://github.com/tatavarthiv"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/vijay-tatavarthi"
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
