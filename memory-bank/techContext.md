# Technical Context: Personal Blog

## Technologies Used

### Core Technologies

- **React 18+**: UI library for building the interface
- **TypeScript**: For type-safe development and better developer experience
- **Vite**: Modern build tool and development environment with HMR
- **Vanilla CSS**: Organized CSS without frameworks (NO Tailwind, NO CSS Modules)

### Key Libraries

- **React Router v6**: Client-side routing and navigation
- **React Icons**: UI icons (specifically Feather icons - `react-icons/fi`)
- **date-fns**: Date formatting and manipulation utilities

### Development Tools

- **ESLint**: Code linting and quality enforcement
- **TypeScript Config**: Strict type checking configuration
- **Vite Config**: Optimized build and development settings

## Development Setup

### Project Structure (Current)

```
/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # Images, fonts, media files
│   ├── components/      # Reusable UI components
│   │   └── common/      # Shared components (Header, Footer, ContentCard)
│   ├── context/         # React context providers (Theme, ContentService)
│   ├── data/            # Static data files (temporary - migrating to Firebase)
│   │   ├── blogPostData.ts    # Blog post data
│   │   └── projectsData.ts    # Project data
│   ├── layouts/         # Page layout components
│   ├── pages/           # Page components (Home, Blog, Projects, About)
│   ├── services/        # Service layer abstractions
│   │   └── content/     # Content service implementations
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions and utilities
│   ├── App.tsx          # Root component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles (organized in sections)
├── index.html           # HTML template
└── config files         # Vite, TypeScript, ESLint configurations
```

### CSS Architecture (Post-Refactoring)

**File**: `src/index.css` - Single, well-organized CSS file with sections:

```css
/* 1. CSS Variables & Root Styles */
/* 2. Global Styles (typography, buttons, links) */
/* 3. Layout Components (header, footer, navigation) */
/* 4. Common Components (ContentCard, pagination, theme toggle) */
/* 5. Page-Specific Styles (blog, projects, about pages) */
/* 6. Utility Classes (tags, colors, helpers) */
/* 7. Responsive Design (mobile, tablet breakpoints) */
```

**Key Features**:

- CSS Custom Properties for theming
- Semantic class naming conventions
- Mobile-first responsive design
- Dark/light mode support via `data-theme` attribute

### Component Architecture

Components follow this pattern:

```tsx
// Component.tsx
import { FC } from "react";
import { useTheme } from "../../context/themeContext";
import { useContentService } from "../../context/contentServiceContext";

interface ComponentProps {
  // Strongly typed props
}

const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  const { theme } = useTheme();
  const contentService = useContentService();

  // Component implementation
  return <div className="component-container">{/* Content */}</div>;
};

export default Component;
```

## Current Technical Implementation

### Content Management (Current - Static Data)

```typescript
// Static TypeScript data structure
export const blogPosts: BlogPost[] = [
  {
    id: string,
    title: string,
    slug: string,
    excerpt: string,
    content: string,
    coverImage: string,
    tags: string[],
    date: string,
    author: string
  }
];
```

**Content Service Abstraction**:

```typescript
export interface ContentService {
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getProjects(): Promise<Project[]>;
}

// Current implementation
export class FileContentService implements ContentService {
  // Returns static data from TypeScript files
}
```

### Theme Implementation

```tsx
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    // 2. Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    // 3. Default to light
    return "light";
  });

  // Theme management logic
}
```

### Routing Configuration

```tsx
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
              <Route path="newsletter" element={<NewsletterPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ContentServiceProvider>
    </ThemeProvider>
  );
}
```

## Migration Plan: Static Data → Supabase

### Database Migration Strategy

**Phase 1**: Supabase Setup

```typescript
// New implementation coming soon
export class SupabaseContentService implements ContentService {
  private supabase: SupabaseClient;

  async getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  }

  async createBlogPost(post: CreateBlogPost): Promise<void> {
    // Admin functionality
    const { error } = await this.supabase.from("posts").insert([post]);

    if (error) throw error;
  }
}
```

**Phase 2**: Authentication Integration

```typescript
// Supabase Auth setup
export const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, user: session?.user };
};
```

**Phase 3**: Image Upload System

```typescript
// Supabase Storage integration
export const useImageUpload = () => {
  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(filePath);

    return publicUrl;
  };

  return { uploadImage };
};
```

## Technical Constraints & Decisions

### Current Constraints

- **Static Content**: All content managed through TypeScript files (temporary)
- **No Backend**: Pure frontend application (changing with Supabase)
- **Build-time Content**: Requires rebuild for content changes (changing)

### Browser Support

- **Target**: Modern browsers (Chrome, Firefox, Edge, Safari)
- **ES Version**: ES2020+
- **No IE Support**: Not optimizing for Internet Explorer

### Performance Targets

- **Lighthouse Score**: 90+ in all categories
- **Initial Load**: Under 2 seconds on average connections
- **Time to Interactive**: Under 3 seconds
- **Bundle Size**: Optimize with code splitting

## Development Workflow

### Current Process

1. Clone repository
2. Install dependencies (`npm install`)
3. Start development server (`npm run dev`)
4. Add content by editing TypeScript data files
5. Build production bundle (`npm run build`)
6. Deploy to Vercel/Netlify

### Future Process (Post-Supabase Migration)

1. Admin login through Supabase Auth
2. Create/edit posts through admin interface
3. Upload images to Supabase Storage
4. Content automatically synced to PostgreSQL
5. Real-time updates without rebuilds

## Tool Usage Patterns

### Content Service Pattern (Current)

```tsx
// Usage in components
export default function BlogPage() {
  const contentService = useContentService();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await contentService.getBlogPosts();
      setPosts(postData);
    };
    fetchPosts();
  }, [contentService]);

  return (
    <div className="blog-page">
      {posts.map((post) => (
        <ContentCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
```

### ContentCard Component (Unified System)

```tsx
// Single component handles all card types
<ContentCard
  title={item.title}
  date={formatDate(item.date)}
  image={item.coverImage || item.imageUrl}
  excerpt={item.excerpt || item.description}
  tags={item.tags}
  slug={item.slug}
  links={item.links} // For projects
  className="blog-post-card" // Layout-specific styling
/>
```

## Code Quality Standards

### TypeScript Configuration

- **Strict mode**: Enabled for type safety
- **No implicit any**: All types must be explicit
- **Import organization**: Consistent import ordering
- **Type-only imports**: Separate type imports when needed

### CSS Standards

- **BEM-inspired naming**: `.component-element--modifier`
- **CSS Custom Properties**: For theming and reusability
- **Mobile-first**: Design for mobile, enhance for desktop
- **Semantic HTML**: Proper accessibility and SEO

### Component Standards

- **Functional components**: No class components
- **TypeScript interfaces**: All props typed
- **Default exports**: Consistent export pattern
- **Hook usage**: Custom hooks for shared logic
