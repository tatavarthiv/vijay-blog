import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }

      try {
        const fetchedPost = await contentService.getBlogPostBySlug(slug);
        if (!fetchedPost) {
          navigate("/blog");
          return;
        }
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, contentService, navigate]);

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return null;
  }

  // Get tag CSS class from tag name
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="blog-post">
      <h1 className="blog-title">{post.title}</h1>

      <header className="post-header">
        <div className="post-meta">
          <div className="post-date">{formatDate(post.date)}</div>
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className={getTagClass(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {post.coverImage && (
        <div className="post-cover">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
