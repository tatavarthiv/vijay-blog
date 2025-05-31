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
        <div className="newsletter-recent-grid">
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
