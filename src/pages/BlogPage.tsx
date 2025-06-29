import { useEffect, useState } from "react";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";
import ContentCard from "../components/common/ContentCard";

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
      <h1 className="main-title">THE BLOG</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <ContentCard
              key={post.slug}
              title={post.title}
              date={formatDate(post.date)}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
