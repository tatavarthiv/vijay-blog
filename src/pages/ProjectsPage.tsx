import ContentCard from "../components/common/ContentCard";
import { projects } from "../data/projectsData";

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <h1 className="main-title">PROJECTS</h1>

      <h2 className="section-title">Project List</h2>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              image={project.imageUrl}
              excerpt={project.description}
              tags={project.tags}
              slug={project.slug}
              linkPrefix="/projects/"
            />
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
