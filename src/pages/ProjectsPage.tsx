import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import ContentCard from "../components/common/ContentCard";
import { projects } from "../data/projectsData";

export default function ProjectsPage() {
  const [loading] = useState(false);

  // Get tag CSS class from tag name
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="projects-page">
      <h1 className="main-title">PROJECTS</h1>

      <h2 className="project-list-title">Project List</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="projects-grid">
          {/* First row - 2 cards */}
          {projects.slice(0, 2).map((project, index) => (
            <ContentCard
              key={project.id}
              title={project.title}
              image={project.imageUrl}
              excerpt={project.description}
              tags={project.tags}
              links={project.links}
              showArrow={true}
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
              links={project.links}
              showArrow={true}
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
              links={project.links}
              showArrow={true}
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
