import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";

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
  excerpt,
  slug,
  className = "",
  linkPrefix = "/blog/",
}: ContentCardProps) {
  const cardContent = (
    <div className="horizontal-card-content">
      <NotebookPen size={28} className="notebook-icon" />
      <div className="horizontal-card-text">
        <h3 className="horizontal-card-title">{title}</h3>
        {date && <span className="horizontal-card-date">{date}</span>}
        {excerpt && <p className="horizontal-card-excerpt">{excerpt}</p>}
      </div>
    </div>
  );

  return (
    <article className={`horizontal-content-card ${className}`}>
      {slug ? (
        <Link to={`${linkPrefix}${slug}`} className="horizontal-card-link">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </article>
  );
}
