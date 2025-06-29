import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { Project, BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";

export default function ProjectPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        navigate("/projects");
        return;
      }

      try {
        const [fetchedProject, allPosts] = await Promise.all([
          contentService.getProjectBySlug(slug),
          contentService.getBlogPosts(),
        ]);

        if (!fetchedProject) {
          navigate("/projects");
          return;
        }

        setProject(fetchedProject);
        // Get 10 most recent blog posts for Further Reading
        setRecentPosts(allPosts.slice(0, 10));
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
    <div className="post-layout">
      <div className="post-main">
        <h1 className="post-title">{project.title}</h1>
        <div className="post-date">Project</div>

        {project.description && (
          <div className="post-excerpt">{project.description}</div>
        )}

        {project.imageUrl && (
          <div className="post-cover">
            <img src={project.imageUrl} alt={project.title} />
          </div>
        )}

        <div className="post-content">
          <ReactMarkdown>
            {project.content.replace(/^#\s+.*$/m, "").trim()}
          </ReactMarkdown>
        </div>
      </div>

      <div className="post-sidebar">
        <div className="further-reading">
          <h3>Further Reading</h3>
          <div className="recent-posts">
            {recentPosts.map((recentPost) => (
              <Link
                key={recentPost.slug}
                to={`/blog/${recentPost.slug}`}
                className="recent-post-link"
              >
                <div className="recent-post-date">
                  {formatDate(recentPost.date)}
                </div>
                <div className="recent-post-title">{recentPost.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
