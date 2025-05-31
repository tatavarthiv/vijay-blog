import { useEffect, useState } from "react";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";
import ContentCard from "../components/common/ContentCard";

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

  // Get only the first 4 posts for the recent posts section
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="home-page">
      <h1 className="main-title">THE BLOG</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <section className="recent-posts-section">
          <h2 className="section-title">Recent blog posts</h2>
          <div className="recent-posts-grid">
            {recentPosts.map((post) => (
              <ContentCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                image={post.coverImage}
                excerpt={post.excerpt}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </div>
        </section>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
