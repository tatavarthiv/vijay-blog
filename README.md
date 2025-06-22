# Vijay's Personal Blog & Portfolio

A modern, responsive personal blog and portfolio built with React, TypeScript, and Vite. This project showcases blog posts, projects, and personal information with a clean, professional UI design that includes dark mode support.

## Features

- **Blog Section**: Display blog posts with a featured grid layout, tags, and pagination
- **Projects Portfolio**: Showcase personal projects with a visually appealing 2-1-2 grid layout
- **Dark/Light Theme**: Toggle between dark and light mode with system preference detection
- **Responsive Design**: Optimized for desktop and mobile devices
- **Content Management**: Static TypeScript data structure for easy content updates

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

## Roadmap

Future planned enhancements:

- [ ] Implement pagination
- [ ] Add filtering by project tags
- [ ] Implement code syntax highlighting for blog posts
- [ ] Add search functionality
- [ ] Create working newsletter subscription functionality
- [ ] Add comments section for blog posts

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

---
