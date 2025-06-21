# System Patterns: Personal Blog

## Core Architecture

```
User → App → Router → MainLayout → Pages → ContentCard
     ↓
   ThemeContext + ContentServiceContext
     ↓
   FileContentService → Static Data (current)
   SupabaseContentService → PostgreSQL (planned)
```

## Key Patterns

### **ContentCard System**

Single component handles all content types:

```typescript
<ContentCard
  title={post.title}
  date={formatDate(post.date)}
  image={post.coverImage}
  excerpt={post.excerpt}
  tags={post.tags}
  slug={post.slug}
  linkPrefix="/blog/" // or "/projects/"
/>
```

### **Service Pattern**

```typescript
interface ContentService {
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getProjects(): Promise<Project[]>;
  // ... other methods
}

// Current: FileContentService (static data)
// Future: SupabaseContentService (database)
```

### **Theme System**

- ThemeContext with localStorage + system preference
- CSS custom properties for light/dark themes
- Document attribute: `[data-theme="dark"]`

### **CSS Organization**

```css
/* 1. CSS Variables & Root Styles */
/* 2. Global Styles */
/* 3. Layout Components */
/* 4. Common Components */
/* 5. Page-Specific Styles */
/* 6. Responsive Design */
```

## Migration Strategy

Replace static data with Supabase while maintaining the same ContentService interface:

```typescript
// Current
const contentService = new FileContentService();

// Future
const contentService = new SupabaseContentService();

// Pages remain unchanged due to interface abstraction
```

## Data Types

```typescript
interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
  links?: {
    github?: string;
    demo?: string;
  };
}
```
