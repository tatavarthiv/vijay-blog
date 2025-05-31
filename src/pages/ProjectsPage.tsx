import ContentCard from "../components/common/ContentCard";
import { projects } from "../data/projectsData";

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <h1 className="main-title">PROJECTS</h1>

      <h2 className="project-list-title">Project List</h2>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {/* First row - 2 cards */}
          {projects.slice(0, 2).map((project, index) => (
            <ContentCard
              key={project.id}
              title={project.title}
              image={project.imageUrl}
              excerpt={project.description}
              tags={project.tags}
              slug={project.slug}
              linkPrefix="/projects/"
              className={`project-card project-card-row-1`}
            />
          ))}

          {/* Second row - 1 card spanning full width */}
          {projects.slice(2, 3).map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              image={project.imageUrl}
              excerpt={project.description}
              tags={project.tags}
              slug={project.slug}
              linkPrefix="/projects/"
              className="project-card project-card-row-2"
            />
          ))}

          {/* Third row - 2 cards */}
          {projects.slice(3, 5).map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              image={project.imageUrl}
              excerpt={project.description}
              tags={project.tags}
              slug={project.slug}
              linkPrefix="/projects/"
              className="project-card project-card-row-3"
            />
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
