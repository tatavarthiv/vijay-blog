import headshot from "../assets/headshot.JPG?url";

export default function AboutPage() {
  return (
    <div className="about-page container">
      <h1 className="main-title">VIJAY TATAVARTHI</h1>

      {/* Top section with headshot on left, about me on right */}
      <section className="about-intro-grid">
        {/* Left column - headshot */}
        <div className="headshot-container">
          <img
            src={headshot}
            alt="Vijay Tatavarthi"
            className="headshot-image"
          />
        </div>

        {/* Right column - about me */}
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            <b>welcome to my blog!</b> i'm vijay, a recent berkeley grad and
            software engineer based in the bay area. as most of this current
            generation, ai has fried my brain beyond belief over the past few
            years - although the amount of information im consuming has
            increased, my ability to process and retain it has decreased.
          </p>
          <p>
            after college, i've come to the realization that tech truly is my
            passion - before work, during work, after work, and even on
            weekends. as i've been learning through work, courses, projects,
            podcasts, and more, it's been harder to make sense of it all. this
            blog is a way for me to summarize my learnings weekly and explain it
            in a way that is cogent and accessible, even for non-devs - no ai
            generated slop, just real thoughts and insights.
          </p>
        </div>
      </section>

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
          {/* Core Skills */}
          <span className="tag tag-blue">React</span>
          <span className="tag tag-teal">HTML / CSS / JavaScript</span>
          <span className="tag tag-yellow">Python</span>
          <span className="tag tag-red">Java</span>
          <span className="tag tag-purple">C</span>
          <span className="tag tag-orange">Git</span>
          <span className="tag tag-green">CI/CD</span>
        </div>
      </section>

      {/* Experience section */}
      <section className="experience-section" style={{ marginTop: "3rem" }}>
        <h2>Work Experience</h2>

        <div className="experience-item" style={{ marginTop: "1.5rem" }}>
          <h3>Amazon</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Software Development Engineer Intern | Palo Alto, CA | May 2023 –
            August 2023
          </p>
          <ul>
            <li>
              Worked with delivery planner team to enhance delivery report
              generation by optimizing critical API and database operations
            </li>
            <li>
              Revamped API design enabling concurrent budgetId data retrieval
              from various resources through a server-side thread pool
            </li>
            <li>
              Designed client-side budgetId batching using Java's completable
              futures and managed output data mapping and error handling
            </li>
            <li>
              Integrated AWS CloudWatch for performance metrics and conducted
              E2E/integration tests and data integrity validation
            </li>
            <li>
              <strong>Impact:</strong> Tripled data retrieval speeds and
              deployed multiple high-priority projects to production with full
              engineering access
            </li>
          </ul>
        </div>

        <div className="experience-item" style={{ marginTop: "1.5rem" }}>
          <h3>Optum</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Software Engineering Intern | Remote | June 2022 – August 2022
          </p>
          <ul>
            <li>
              Worked on the Quality-of-Service team to provide data to the NCQA
              and ensure clinical standards are upheld for hospitals
            </li>
            <li>
              Validated sizeable data from medical providers to guarantee
              patients received appropriate treatment within insurance ranges
            </li>
            <li>
              Replaced outdated SSIS (SQL Server Integration Services) ETL
              packages and replicated behaviors using Python scripts
            </li>
            <li>
              <strong>Impact:</strong> Doubled efficiency of critical data
              management processes resulting in improved HEDIS insurance policy
              ratings
            </li>
          </ul>
        </div>
      </section>

      {/* Education section */}
      <section className="education-section" style={{ marginTop: "3rem" }}>
        <h2>Education</h2>

        <div className="education-item" style={{ marginTop: "1.5rem" }}>
          <h3>University of California, Berkeley</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            B.A. Computer Science | Graduation: May 2024
          </p>
          <p>
            <strong>Relevant Coursework:</strong> Data Structures,
            Interpretation of Computer Programs, Computer Architecture,
            Artificial Intelligence, Operating Systems, Efficient Algorithms,
            Computer Security, Database Systems, Full-Stack Web Development,
            Software Engineering, Discrete Math/Probability Theory, Designing
            Information Devices & Systems, Advanced Data Science
          </p>
          <p>
            <strong>Campus Involvement:</strong> Theta Tau Engineering, Berkeley
            Model United Nations, SBC Consulting, Poker @ Berkeley
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section" style={{ marginTop: "3rem" }}>
        <h2>Contact</h2>
        <p>
          Feel free to reach out to me for collaborations, opportunities, or
          just to say hello!
        </p>
        <div className="contact-links">
          <a href="mailto:tatavarthiv@gmail.com">Email</a>
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
