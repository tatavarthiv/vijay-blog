# System Patterns: Personal Blog

## System Architecture

```mermaid
graph TD
    User[User] --> App[App Component]
    App --> Router[React Router]
    Router --> Blog[Blog Page]
    Router --> Project[Projects Page]
    Router --> About[About Page]
    Router --> Newsletter[Newsletter Page]

    Blog --> PostList[Post List Component]
    Blog --> PostDetail[Post Detail Component]

    PostList --> PostCard[Post Card Component]

    Project --> ProjectList[Project List Component]
    ProjectList --> ProjectCard[Project Card Component]

    SharedComponents[Shared Components] --> Header[Header]
    SharedComponents --> Footer[Footer]
    SharedComponents --> ThemeToggle[Theme Toggle]
    SharedComponents --> Pagination[Pagination]

    DataLayer[Data Layer] --> ContentService[Content Service]
    ContentService --> BlogPostLoader[Blog Post Loader]
    ContentService --> ProjectDataLoader[Project Data Loader]

    BlogPostLoader --> MarkdownParser[Markdown Parser]

    ThemeContext[Theme Context] --> ThemeToggle
    ThemeContext --> App
```

## Key Technical Decisions

### Content Management

- **Markdown-based Content**: Blog posts will be written in Markdown and stored in the repository
- **Frontmatter for Metadata**: Each post will include frontmatter for title, date, tags, etc.
- **Static JSON for Projects**: Project data will be stored in JSON files for simplicity
- **Content Service Abstraction**: Data access layer to isolate content fetching logic
- **Database Migration Path**: Design enables future switch from files to database without UI changes

### Component Architecture

- **Component-Based Design**: UI broken down into reusable, composable components
- **Container/Presentation Pattern**: Separate data handling from UI rendering
- **Context API for Global State**: Theme preferences and potentially other global states

### Routing

- **Client-Side Routing**: Using React Router for navigation without page reloads
- **Path-Based Routes**: Clean URL structure (/blog, /projects, /about, etc.)
- **Dynamic Routes**: Support for dynamic paths like /blog/:slug for individual posts

### Performance Considerations

- **Code Splitting**: Lazy loading components to reduce initial bundle size
- **Image Optimization**: Properly sized and compressed images for posts
- **Memoization**: Strategic use of React.memo and useMemo for expensive operations

## Design Patterns in Use

### Component Patterns

- **Compound Components**: For related component groups
- **Render Props/Hooks**: For shared component logic
- **Higher-Order Components**: Where appropriate for cross-cutting concerns

### State Management

- **Context + Reducers**: For more complex state (if needed)
- **Local Component State**: For component-specific UI state
- **Custom Hooks**: To encapsulate and reuse state logic

### Data Flow

- **Unidirectional Data Flow**: Parent-to-child props passing
- **Events Up, Data Down**: Child components emit events, parents pass data
- **Async Data Handling**: Loading states and error boundaries for data fetching

## Critical Implementation Paths

### Theme Switching

```mermaid
sequenceDiagram
    User->>ThemeToggle: Clicks toggle
    ThemeToggle->>ThemeContext: Updates theme preference
    ThemeContext->>LocalStorage: Stores preference
    ThemeContext->>App: Re-renders with new theme
    App->>Components: Propagate theme changes
```

### Content Rendering

```mermaid
sequenceDiagram
    User->>Router: Navigates to blog post
    Router->>PostDetail: Renders component
    PostDetail->>BlogPostLoader: Requests post data
    BlogPostLoader->>MarkdownParser: Parses markdown content
    MarkdownParser->>PostDetail: Returns HTML content
    PostDetail->>User: Displays formatted post
```

### Pagination

```mermaid
sequenceDiagram
    User->>PostList: Views blog list
    PostList->>DataLayer: Requests posts for current page
    DataLayer->>PostList: Returns paginated posts
    PostList->>PostCard: Renders multiple cards
    User->>Pagination: Clicks next page
    Pagination->>PostList: Updates current page
    PostList->>DataLayer: Requests new page data
```
