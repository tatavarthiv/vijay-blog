# Project Brief: Personal Blog

## Overview

A personal blog to showcase thoughts, projects, and technical content built with React and TypeScript using Vite. The blog features light/dark mode theming and is designed for easy content management and scalability.

## Current State (Post-Major Refactoring)

**Status**: ✅ **Clean, well-organized codebase ready for database migration**

- ✅ Modern, responsive interface with clean design
- ✅ Comprehensive CSS refactoring completed (600+ lines reorganized)
- ✅ Unified ContentCard component system across all pages
- ✅ Light/dark mode theming with system preference detection
- ✅ All duplicate code and unused imports eliminated
- ✅ Clean project structure with semantic naming conventions

## Technical Stack (Current Implementation)

- **Frontend Framework**: React 18+ with TypeScript ✅
- **Build Tool**: Vite ✅
- **Styling**: **Vanilla CSS** (organized in sections, no CSS framework) ✅
- **Routing**: React Router v6 ✅
- **Content**: Static TypeScript data (temporary - **migrating to Supabase**) ✅
- **Icons**: React Icons (Feather icons) ✅
- **Date Handling**: date-fns ✅

## Immediate Migration Plan

### **Phase 1: Database Migration (Priority #1)**

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (admin login)
- **File Storage**: Supabase Storage (image uploads)
- **Migration Goal**: Replace static TypeScript data with real database

### **Phase 2: Core Features (Priority #2)**

- **Search functionality** - Essential for content discovery
- **Mobile responsive fixes** - Current mobile experience needs improvement
- **Basic admin interface** - Simple form for adding/editing posts

### **Phase 3: Content Management**

- **Markdown rendering option** - Posts written in Markdown, rendered to HTML
- **Image upload system** - Direct integration with Firebase Storage
- **Tag management** - Structured tagging system and filtering by tags

## Architecture Vision

### **Database Schema Design**

```sql
-- Supabase PostgreSQL Tables
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- Markdown
  cover_image TEXT, -- Supabase Storage URL
  tags TEXT[],
  date TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE,
  author TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Content Service Pattern**

Current ContentService interface will be extended with:

- `SupabaseContentService` implementation
- Real-time data synchronization
- Search capabilities
- Admin CRUD operations

## Feature Roadmap

### **Immediate (Next Sprint)**

1. ✅ **Database Migration** - Supabase setup
2. ✅ **Search Implementation** - Client-side search functionality
3. ✅ **Mobile Responsive Fixes** - Critical UX improvements

### **Medium-term (1-2 days)**

1. **Tag-based filtering** - Better content organization
2. **RSS feed generation** - Standard blog feature
3. **Anonymous comments** - Basic engagement feature

### **Long-term (3+ days)**

1. **Newsletter automation** - Replace placeholder with real functionality
2. **Social media sharing** - Increase content reach
3. **Analytics integration** - Google Analytics or similar

### **Future Considerations**

1. **Admin dashboard** - Rich content management interface
2. **Multi-author support** - If expansion needed
3. **Advanced SEO** - Meta tags, structured data, sitemaps
4. **PWA features** - Offline support, mobile app experience

## Design Philosophy

- **Mobile-first responsive design** - Fix current mobile issues
- **Clean, semantic HTML/CSS** - No framework dependencies
- **Component reusability** - Unified ContentCard system
- **Performance-focused** - Optimized loading and rendering
- **SEO-friendly** - Proper meta tags and structured data

## Deployment Strategy

- **Frontend**: Vercel/Netlify/Github (current)
- **Database**: Supabase (free tier)
- **Images**: Supabase Storage
- **Domain**: Custom domain when ready
- **CI/CD**: GitHub Actions for automated deployment

## Success Metrics

1. **Developer Experience**: Easy content management (no more TypeScript file editing)
2. **User Experience**: Fast loading, mobile-friendly, searchable content
3. **Content Growth**: Easy to add new posts with rich formatting
4. **Performance**: Lighthouse scores 90+ across all categories
5. **Engagement**: Comments, social sharing, newsletter signups
