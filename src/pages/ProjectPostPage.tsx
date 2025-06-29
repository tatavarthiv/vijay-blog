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

  return (
    <div className="blog-post">
      <h1 className="blog-title">{project.title}</h1>

      {project.imageUrl && (
        <div className="post-cover">
          <img src={project.imageUrl} alt={project.title} />
        </div>
      )}

      <div className="post-content">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
    </div>
  );
}
