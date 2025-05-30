import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";
import { FiArrowRight } from "react-icons/fi";

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await contentService.getBlogPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [contentService]);

  // Get tag CSS class from tag name
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  // Get only the first 4 posts for the recent posts section
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="home-page">
      <h1 className="main-title">THE BLOG</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <section className="recent-posts-section">
          <h2>Recent blog posts</h2>
          <div className="recent-posts-grid">
            {recentPosts.map((post, index) => {
              const postClasses = [
                "recent-post-card",
                index === 0 ? "recent-post-main" : "",
                index === 1 || index === 2 ? "recent-post-secondary" : "",
                index === 3 ? "recent-post-fourth" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article key={post.slug} className={postClasses}>
                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.title} />
                  )}
                  <div className="recent-post-content">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="recent-post-title">{post.title}</h3>
                    </Link>
                    {post.excerpt && (
                      <p className="recent-post-excerpt">{post.excerpt}</p>
                    )}
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
                  {index === 0 || index === 3 ? (
                    <Link to={`/blog/${post.slug}`} className="read-more-link">
                      <FiArrowRight size={20} className="arrow-icon" />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
