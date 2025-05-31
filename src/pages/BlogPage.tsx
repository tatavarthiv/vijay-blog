import { useEffect, useState } from "react";
import type { BlogPost } from "../types/content";
import { useContentService } from "../context/contentServiceContext";
import { formatDate } from "../utils/dateUtils";
import ContentCard from "../components/common/ContentCard";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contentService = useContentService();

  const postsPerPage = currentPage === 1 ? 6 : 12;
  const totalPages = Math.ceil((posts.length - 4) / postsPerPage);

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

  const recentPosts = posts.slice(0, 4);
  const remainingPosts = posts.slice(4);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = remainingPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="blog-page">
      <h1 className="main-title">THE BLOG</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <>
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
                  <ContentCard
                    key={post.slug}
                    title={post.title}
                    date={formatDate(post.date)}
                    image={post.coverImage}
                    excerpt={post.excerpt}
                    tags={post.tags}
                    slug={post.slug}
                    className={postClasses}
                  />
                );
              })}
            </div>
          </section>

          <section className="all-posts-section">
            <h2>All blog posts</h2>
            <div className="all-posts-grid">
              {paginatedPosts.map((post) => (
                <ContentCard
                  key={post.slug}
                  title={post.title}
                  date={formatDate(post.date)}
                  image={post.coverImage}
                  excerpt={post.excerpt}
                  tags={post.tags}
                  slug={post.slug}
                  className="blog-post-card"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <button
                    className="pagination-prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`pagination-item ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                {currentPage < totalPages && (
                  <button
                    className="pagination-next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </section>
        </>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
