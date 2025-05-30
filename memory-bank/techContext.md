# Technical Context: Personal Blog

## Technologies Used

### Core Technologies

- **React 18+**: UI library for building the interface
- **TypeScript**: For type-safe development
- **Vite**: Build tool and development environment
- **CSS Modules**: For component-specific styling

### Key Libraries

- **React Router v6**: Client-side routing
- **React Icons**: For UI icons
- **date-fns**: Date formatting and manipulation

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting

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
│   │   ├── blog/        # Original Markdown blog posts (not actively used)
│   │   ├── blogPostData.ts  # Static blog post data
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

Components follow this typical pattern:

```tsx
// Component.tsx
import { FC } from "react";
import { useTheme } from "../../context/themeContext";
import { useContentService } from "../../context/contentServiceContext";

interface ComponentProps {
  // Props definition
}

const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  const { theme } = useTheme();
  const contentService = useContentService();

  // Component implementation
  return <div className="component-container">{/* Component content */}</div>;
};

export default Component;
```

## Technical Implementation Details

### Content Management

- **Static TypeScript Data**: Blog posts are defined in a TypeScript file as an array of strongly-typed objects
- **Content Service Abstraction**: Interface-based design separates the data source from UI components
- **File Content Service**: Current implementation that reads from static data and JSON files
- **Extensible Design**: Architecture supports future migration to API or database without UI changes

### Theme Implementation

```tsx
// Theme context implementation
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    // If no theme stored, check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // Default to light
    return "light";
  });

  // Theme logic implementation...

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Routing Configuration

```tsx
// App.tsx routing setup
function App() {
  return (
    <ThemeProvider>
      <ContentServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="newsletter" element={<div>Newsletter Signup</div>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ContentServiceProvider>
    </ThemeProvider>
  );
}
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

1. Add new blog post to the `blogPostData.ts` file following the defined structure
2. Add any new project data as JSON files in `/src/data/projects/`
3. Build and verify locally before deployment

### Deployment Process

1. Build production bundle (`npm run build`)
2. Deploy to chosen platform (GitHub Pages, Vercel, Netlify)

## Tool Usage Patterns

### Content Service Pattern

```tsx
// Content service interface
export interface ContentService {
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
}

// File-based implementation
export class FileContentService implements ContentService {
  async getBlogPosts(): Promise<BlogPost[]> {
    // Return static blog posts
    return staticBlogPosts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
  }

  // Other implementations...
}

// Usage with React context
const ContentServiceProvider = ({ children }: { children: ReactNode }) => {
  const contentService = new FileContentService();

  return (
    <ContentServiceContext.Provider value={contentService}>
      {children}
    </ContentServiceContext.Provider>
  );
};
```

### Page Pattern

```tsx
// Typical page component
export default function BlogPage() {
  const contentService = useContentService();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await contentService.getBlogPosts();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [contentService]);

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div className="blog-page">
      <h1>All blog posts</h1>
      <div className="blog-list">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```
