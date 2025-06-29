import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }

      try {
        const [fetchedPost, allPosts] = await Promise.all([
          contentService.getBlogPostBySlug(slug),
          contentService.getBlogPosts(),
        ]);

        if (!fetchedPost) {
          navigate("/blog");
          return;
        }

        setPost(fetchedPost);
        // Get 10 most recent posts excluding the current one
        setRecentPosts(allPosts.filter((p) => p.slug !== slug).slice(0, 10));
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

  return (
    <div className="post-layout">
      <div className="post-main">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-date">{formatDate(post.date)}</div>

        {post.excerpt && <div className="post-excerpt">{post.excerpt}</div>}

        {post.coverImage && (
          <div className="post-cover">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <div className="post-content">
          <ReactMarkdown>
            {post.content.replace(/^#\s+.*$/m, "").trim()}
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
