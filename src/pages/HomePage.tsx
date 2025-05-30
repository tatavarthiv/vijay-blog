import { useEffect, useState } from "react";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";

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

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>THE BLOG</h1>
      </div>

      <div className="recent-posts-section">
        <h2>Recent blog posts</h2>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.slug} className="post-card">
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} />
                )}
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
