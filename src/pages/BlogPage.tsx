import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";

export default function BlogPage() {
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
    <div className="blog-page">
      <h1>All blog posts</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="blog-posts">
          {posts.map((post) => (
            <article key={post.slug} className="blog-post-item">
              <div className="post-container">
                {post.coverImage && (
                  <div className="post-image">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                )}
                <div className="post-content">
                  <Link to={`/blog/${post.slug}`}>
                    <h2>{post.title}</h2>
                  </Link>
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
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
