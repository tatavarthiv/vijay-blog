import { Link } from "react-router-dom";

type ContentCardProps = {
  title: string;
  date?: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  slug?: string;
  className?: string;
  linkPrefix?: string; // e.g., "/blog/" or "/projects/"
};

export default function ContentCard({
  title,
  date,
  image,
  excerpt,
  tags,
  slug,
  className = "",
  linkPrefix = "/blog/",
}: ContentCardProps) {
  // Tag class handling
  const getTagClass = (tag: string) => {
    return `tag tag-${tag.toLowerCase().replace(/\s+/g, "-")}`;
  };

  const cardContent = (
    <>
      {image && <img src={image} alt={title} />}

      <div className="content-card-content">
        {date && <span className="post-date">{date}</span>}
        <h3 className="content-card-title">{title}</h3>
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
      </div>
    </>
  );

  return (
    <article className={`content-card ${className}`}>
      {slug ? (
        <Link to={`${linkPrefix}${slug}`} className="content-card-link">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </article>
  );
}
