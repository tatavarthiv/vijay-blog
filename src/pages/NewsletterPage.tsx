import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { format } from "date-fns";
import ContentCard from "../components/common/ContentCard";
import { useContentService } from "../context/contentServiceContext";
import type { BlogPost } from "../types/content";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await contentService.getBlogPosts();
        setRecentPosts(fetchedPosts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [contentService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    // For now, just show an alert
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <div className="newsletter-page container">
      <h1 className="main-title">NEWSLETTER</h1>

      {/* Newsletter subscription section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <p>
            Subscribe to my newsletter to receive updates on new articles,
            projects, and insights about web development, design patterns, and
            emerging technologies. Stay informed about the latest trends and
            best practices.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Recent blog posts section */}
      <section className="recent-posts-section">
        <h2 className="section-title">Recent Articles</h2>
        {loading ? (
          <p>Loading recent articles...</p>
        ) : (
          <div className="newsletter-recent-grid">
            {recentPosts.map((post) => (
              <ContentCard
                key={post.slug}
                title={post.title}
                date={format(new Date(post.date), "MMMM dd, yyyy")}
                image={post.coverImage}
                excerpt={post.excerpt}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
