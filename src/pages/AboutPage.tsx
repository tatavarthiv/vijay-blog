import { motion } from "framer-motion";
import headshot from "../assets/headshot.JPG?url";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="about-page container">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* About Me Glass Container */}
        <motion.section className="glass-container" variants={itemVariants}>
          <div className="glass-intro-grid">
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
                generation, ai has fried my brain beyond belief over the past
                few years - although the amount of information im consuming has
                increased, my ability to process and retain it has decreased.
              </p>
              <p>
                after college, i've come to the realization that tech truly is
                my passion - before work, during work, after work, and even on
                weekends. as i've been learning through work, courses, projects,
                podcasts, and more, it's been harder to make sense of it all.
                this blog is a way for me to summarize my learnings weekly and
                explain it in a way that is cogent and accessible, even for
                non-devs - no ai generated slop, just real thoughts and
                insights.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills Glass Container */}
        <motion.section className="glass-container" variants={itemVariants}>
          <h2>Skills</h2>
          <div
            className="skills-tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1rem",
            }}
          >
            <span className="glass-tag">React</span>
            <span className="glass-tag">HTML / CSS / JavaScript</span>
            <span className="glass-tag">Python</span>
            <span className="glass-tag">Java</span>
            <span className="glass-tag">C</span>
            <span className="glass-tag">Git</span>
            <span className="glass-tag">CI/CD</span>
            <span className="glass-tag">Node.js</span>
            <span className="glass-tag">TypeScript</span>
            <span className="glass-tag">AWS</span>
          </div>
        </motion.section>

        {/* Experience Glass Container */}
        <motion.section className="glass-container" variants={itemVariants}>
          <h2>Work Experience</h2>

          <div style={{ marginTop: "1.5rem" }}>
            <h3>Amazon</h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}
            >
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

          <div style={{ marginTop: "2rem" }}>
            <h3>Optum</h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}
            >
              Software Engineering Intern | Remote | June 2022 – August 2022
            </p>
            <ul>
              <li>
                Worked on the Quality-of-Service team to provide data to the
                NCQA and ensure clinical standards are upheld for hospitals
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
                management processes resulting in improved HEDIS insurance
                policy ratings
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Education Glass Container */}
        <motion.section className="glass-container" variants={itemVariants}>
          <h2>Education</h2>

          <div style={{ marginTop: "1.5rem" }}>
            <h3>University of California, Berkeley</h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}
            >
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
              <strong>Campus Involvement:</strong> Theta Tau Engineering,
              Berkeley Model United Nations, SBC Consulting, Poker @ Berkeley
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
