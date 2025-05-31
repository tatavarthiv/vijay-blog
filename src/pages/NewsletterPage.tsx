import { useState } from "react";
import type { FormEvent } from "react";
import { blogPosts } from "../data/blogPostData";
import { format } from "date-fns";
import ContentCard from "../components/common/ContentCard";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");

  // Get the 3 most recent blog posts
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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
        <div
          className="newsletter-content"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Subscribe to my newsletter to receive updates on new articles,
            projects, and insights about web development, design patterns, and
            emerging technologies. Stay informed about the latest trends and
            best practices.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginBottom: "3rem",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)",
                width: "300px",
                fontSize: "1rem",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Recent blog posts section */}
      <section className="recent-posts-section">
        <h2 style={{ marginBottom: "2rem" }}>Recent Articles</h2>
        <div
          className="recent-posts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {recentPosts.map((post) => (
            <ContentCard
              key={post.slug}
              title={post.title}
              date={format(new Date(post.date), "MMMM d, yyyy")}
              image={post.coverImage}
              excerpt={post.excerpt}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
