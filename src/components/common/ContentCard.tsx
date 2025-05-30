import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

type ContentCardProps = {
  title: string;
  date?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  slug?: string;
  links?: {
    github?: string;
    demo?: string;
  };
  className?: string;
  showArrow?: boolean;
  linkPrefix?: string; // e.g., "/blog/" or "/projects/"
};

export default function ContentCard({
  title,
  date,
  image,
  excerpt,
  tags,
  slug,
  links,
  className = "",
  showArrow = false,
  linkPrefix = "/blog/",
}: ContentCardProps) {
  // Tag class handling
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <article className={`content-card ${className}`}>
      {image && <img src={image} alt={title} />}

      <div className="content-card-content">
        {date && <span className="post-date">{date}</span>}

        {slug ? (
          <Link to={`${linkPrefix}${slug}`}>
            <h3 className="content-card-title">{title}</h3>
          </Link>
        ) : (
          <h3 className="content-card-title">{title}</h3>
        )}

        {excerpt && <p className="content-card-excerpt">{excerpt}</p>}

        {tags && tags.length > 0 && (
          <div className="post-tags">
            {tags.map((tag) => (
              <span key={tag} className={getTagClass(tag)}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {links && (
          <div className="card-links">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                GitHub
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-demo"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>

      {showArrow && slug && (
        <Link to={`${linkPrefix}${slug}`} className="read-more-link">
          <FiArrowRight size={20} className="arrow-icon" />
        </Link>
      )}
    </article>
  );
}
