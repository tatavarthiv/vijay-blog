# Vijay's Personal Blog & Portfolio

A modern, responsive personal blog and portfolio built with React, TypeScript, and Vite. This project showcases blog posts, projects, and personal information with a clean, professional UI design that includes dark mode support.

## Features

- **Blog Section**: Display blog posts with a featured grid layout, tags, and pagination
- **Projects Portfolio**: Showcase personal projects with a visually appealing 2-1-2 grid layout
- **About Page**: Share personal information and skills
- **Newsletter Sign-up**: Placeholder for future newsletter functionality
- **Dark/Light Theme**: Toggle between dark and light mode with system preference detection
- **Responsive Design**: Optimized for desktop and mobile devices
- **Content Management**: Static TypeScript data structure for easy content updates
- **Generic Component System**: Reusable content card component across different page types

## Technologies

- **React 18**: Modern UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Vite**: Next-generation frontend build tool with lightning-fast HMR
- **React Router v6**: Declarative routing for React applications
- **React Context API**: State management for theming and content
- **CSS**: Custom styling with CSS variables for theming

## Project Structure

```
vijay-blog/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project assets (images, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components (Header, Footer, ContentCard)
│   ├── context/         # React Context providers
│   ├── data/            # Static data for blog posts and projects
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── services/        # Service abstraction layer
│   │   └── content/     # Content service implementation
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── memory-bank/         # Development documentation
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vijay-blog.git
   cd vijay-blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Add a Blog Post

Add a new blog post by updating the `src/data/blogPostData.ts` file:

```typescript
// src/data/blogPostData.ts
export const blogPosts = [
  {
    title: "Your New Blog Post",
    slug: "your-new-blog-post",
    date: "2025-06-01",
    excerpt: "A short description of your blog post",
    coverImage: "https://example.com/image.jpg",
    content: "Full content of your blog post goes here...",
    tags: ["Tag1", "Tag2"],
  },
  // Existing blog posts...
];
```

### Add a Project

Add a new project by updating the `src/data/projectsData.ts` file:

```typescript
// src/data/projectsData.ts
export const projects = [
  {
    id: "your-project-id",
    title: "Your New Project",
    description: "A description of your project",
    imageUrl: "https://example.com/image.jpg",
    tags: ["Design", "Development"],
    links: {
      github: "https://github.com/yourusername/your-repo",
      demo: "https://your-demo-link.com",
    },
  },
  // Existing projects...
];
```

## Roadmap

Future planned enhancements:

- [ ] Implement pagination for projects page
- [ ] Add filtering by project tags
- [ ] Create detailed project view page
- [ ] Implement code syntax highlighting for blog posts
- [ ] Add search functionality
- [ ] Create working newsletter subscription functionality
- [ ] Add comments section for blog posts
- [ ] Set up analytics tracking

## Theme Customization

The theme colors can be customized in `src/index.css`:

```css
:root {
  /* Light mode colors */
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --accent-color: #921010;
  /* Other variables... */
}

[data-theme="dark"] {
  /* Dark mode colors */
  --bg-primary: #121212;
  --text-primary: #ffffff;
  --accent-color: #921010;
  /* Other variables... */
}
```

## License

[MIT License](LICENSE) © Vijay Tatavarthi

---

Created by Vijay Tatavarthi - [GitHub](https://github.com/yourusername)
