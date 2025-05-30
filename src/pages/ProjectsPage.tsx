import { useEffect, useState } from "react";
import type { Project } from "../types/content";
import { useContentService } from "../context/contentServiceContext";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await contentService.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [contentService]);

  return (
    <div className="projects-page">
      <h1>Projects</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.imageUrl && (
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.links && (
                  <div className="project-links">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-github"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-demo"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
