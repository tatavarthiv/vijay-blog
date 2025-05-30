# Technical Context: Personal Blog

## Technologies Used

### Core Technologies

- **React 18+**: UI library for building the interface
- **TypeScript**: For type-safe development
- **Vite**: Build tool and development environment
- **Tailwind CSS**: Utility first CSS framework

### Key Libraries

- **React Router**: Client-side routing
- **React Markdown**: For rendering Markdown content
- **gray-matter**: For parsing frontmatter in Markdown files
- **react-helmet**: For managing document head (SEO)
- **framer-motion** (optional): For UI animations

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest** (optional): Unit testing
- **Storybook** (optional): Component development and documentation

## Development Setup

### Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components (Header, Footer, etc.)
│   │   ├── blog/        # Blog-specific components
│   │   └── projects/    # Project-specific components
│   ├── context/         # React context providers
│   ├── data/            # Static data and content
│   │   ├── blog/        # Markdown blog posts
│   │   └── projects/    # Project data (JSON)
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout components
│   ├── pages/           # Page components
│   ├── services/        # Service layer abstractions
│   │   ├── content/     # Content service implementations
│   │   └── api/         # API service implementations (future)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions and utilities
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
└── config files         # Various configuration files
```

### Component Structure

Components will generally follow this pattern:

```tsx
// Component.tsx
import { FC } from "react";
import styles from "./Component.module.css";

interface ComponentProps {
  // Props definition
}

const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component implementation
  return <div className={styles.container}>{/* Component content */}</div>;
};

export default Component;
```

## Technical Constraints

### Content Management

- **Static Content**: All content managed through files in the repository
- **Build Process**: Need to rebuild and redeploy when content changes
- **Image Management**: Manual optimization and placement in assets folder

### Browser Support

- **Modern Browsers**: Targeting evergreen browsers (Chrome, Firefox, Edge, Safari)
- **No IE Support**: Not optimizing for Internet Explorer

### Performance Targets

- **Lighthouse Score**: Aiming for 90+ in all categories
- **Initial Load**: Under 2 seconds on average connections
- **Time to Interactive**: Under 3 seconds

## Development Workflow

### Setup Process

1. Clone repository
2. Install dependencies (`npm install`)
3. Start development server (`npm run dev`)

### Adding Content

1. Create new Markdown file in `/src/data/blog/`
2. Add frontmatter with metadata
3. Write content using Markdown
4. Add any images to `/src/assets/`
5. Build and verify locally before deployment

### Deployment Process

1. Build production bundle (`npm run build`)
2. Deploy to chosen platform (GitHub Pages, Vercel, Netlify)

## Tool Usage Patterns

### Managing Theme

```tsx
// Theme context example
import { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Implementation...
};
```

### Content Service Abstraction

```tsx
// Content service interface
export interface ContentService {
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
}

// File-based implementation (initial)
export class FileContentService implements ContentService {
  async getBlogPosts(): Promise<BlogPost[]> {
    // Load from Markdown files
    return loadPostsFromFiles();
  }

  // Other implementations...
}

// Future database implementation
export class DatabaseContentService implements ContentService {
  async getBlogPosts(): Promise<BlogPost[]> {
    // Load from database
    return fetchPostsFromDatabase();
  }

  // Other implementations...
}

// Usage with dependency injection
const ContentServiceProvider = ({ children }: { children: ReactNode }) => {
  const contentService = new FileContentService();

  return (
    <ContentServiceContext.Provider value={contentService}>
      {children}
    </ContentServiceContext.Provider>
  );
};
```

### Rendering Markdown Content

```tsx
// Blog post rendering example
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useContentService } from "../hooks/useContentService";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentService = useContentService();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await contentService.getBlogPostBySlug(slug);
      setPost(postData);
    };

    fetchPost();
  }, [slug, contentService]);

  // Render with the post data...
};
```
