import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { Project } from "../types/content";
import { useContentService } from "../context/contentServiceContext";

export default function ProjectPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        navigate("/projects");
        return;
      }

      try {
        const fetchedProject = await contentService.getProjectBySlug(slug);
        if (!fetchedProject) {
          navigate("/projects");
          return;
        }
        setProject(fetchedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, contentService, navigate]);

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (!project) {
    return null;
  }

  // Get tag CSS class from tag name
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="blog-post">
      <h1 className="blog-title">{project.title}</h1>

      <header className="post-header">
        <div className="post-meta">
          {project.tags && project.tags.length > 0 && (
            <div className="post-tags">
              {project.tags.map((tag) => (
                <span key={tag} className={getTagClass(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {project.imageUrl && (
        <div className="post-cover">
          <img src={project.imageUrl} alt={project.title} />
        </div>
      )}

      <div className="post-content">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>

      {/* Project Links Section */}
      {project.links && (project.links.github || project.links.demo) && (
        <div className="project-links">
          <h3>Project Links</h3>
          <div className="card-links">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                View on GitHub
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
        </div>
      )}
    </div>
  );
}
