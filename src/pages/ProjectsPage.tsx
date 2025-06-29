import { useEffect, useState } from "react";
import ContentCard from "../components/common/ContentCard";
import { useContentService } from "../context/contentServiceContext";
import type { Project } from "../types/content";

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
      <h1 className="main-title">PROJECTS</h1>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              excerpt={project.description}
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
