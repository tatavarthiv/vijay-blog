# Active Context: Personal Blog

## Current Work Focus

**Status**: ✅ **Clean Codebase Ready for Database Migration**

### Recently Completed

- ✅ **Mobile Responsiveness**: Fixed and working well across devices
- ✅ **Clean Architecture**: Unified ContentCard system, well-organized CSS
- ✅ **Code Quality**: No duplicate code, clean imports, semantic naming

### Current Priority

**🔥 IMMEDIATE**: Supabase migration to replace static TypeScript data

## Critical Development Rules

### **NO INLINE COMMENTS**

**🚫 ABSOLUTELY NO inline comments in code - especially CSS files!**

- User finds them very annoying and unnecessary
- Code should be self-explanatory through good naming
- Only add comments if absolutely essential for complex logic
- This was a major issue in previous sessions - DO NOT repeat

## Next Steps - Database Migration

### **Phase 1: Supabase Setup**

```sql
-- PostgreSQL schema
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- Markdown
  cover_image TEXT,
  tags TEXT[],
  date TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  github_url TEXT,
  demo_url TEXT
);
```

### **Phase 2: Core Features**

- Search functionality (client-side)
- Basic admin interface for content management
- Image upload with Supabase Storage

## Current Architecture Patterns

### **ContentCard System** (Working Well)

- Single component handles all content types (blog posts, projects)
- Props: title, date, image, excerpt, tags, slug, linkPrefix
- Used consistently across HomePage, BlogPage, ProjectsPage

### **Service Pattern** (Ready for Extension)

- ContentService interface currently implemented by FileContentService
- Ready to add SupabaseContentService implementation
- Clean abstraction allows easy migration

### **CSS Organization** (Clean and Organized)

- Vanilla CSS organized in logical sections
- CSS custom properties for theming
- Mobile-first responsive design
- No frameworks, clean custom styles

## Technical Context

**Stack**: React 18 + TypeScript + Vite + React Router v6
**Styling**: Vanilla CSS (no frameworks)
**Current Data**: Static TypeScript files (temporary)
**Target Data**: Supabase PostgreSQL + Storage + Auth

**Key Files**:

- `src/data/blogPostData.ts` - Static blog content (replace with DB)
- `src/data/projectsData.ts` - Static project content (replace with DB)
- `src/services/content/fileContentService.ts` - Current service (extend with Supabase)

## Important Patterns

### **Theme System**

- ThemeContext with localStorage + system preference detection
- CSS custom properties for light/dark themes
- Theme toggle in header works smoothly

### **Routing**

- React Router v6 with nested routes
- MainLayout wrapper with Header/Footer
- Clean URL structure: /blog, /projects, /about, /newsletter

### **Component Architecture**

- Clean separation of concerns
- TypeScript interfaces for all data types
- Context providers for global state (theme, content service)

## Success Metrics for Migration

- Content creation takes < 5 minutes (vs editing TypeScript files)
- Admin interface for non-technical content management
- Maintain current performance and mobile experience
- Zero technical debt in migration process
