# Active Context: Personal Blog

## Current Work Focus

- Initial project setup and requirements gathering
- Establishing the UI design based on the Figma mockup
- Planning the basic architecture and component structure
- Determining content management strategy (Markdown-based)

## Recent Decisions

- Using TypeScript and React with Vite as the foundation
- Adopting a Markdown-based content approach for simplicity and developer experience
- Planning for both light and dark modes with system preference default and manual override
- Desktop-first design approach with responsive considerations for mobile/tablet
- Directory structure that separates concerns (components, pages, data, etc.)

## Next Steps

1. **Project Structure Setup**

   - Create folder structure
   - Configure routing
   - Set up theme context

2. **Core Component Development**

   - Implement header with navigation
   - Create theme toggle functionality
   - Develop page layouts

3. **Blog Content Implementation**

   - Set up Markdown parsing system
   - Create blog post list and detail views
   - Implement pagination

4. **Projects Section Development**

   - Create project card components
   - Set up project data structure
   - Implement project list view

5. **Styling and Theming**
   - Implement design system based on Figma mockup
   - Create light and dark theme variables
   - Add responsive styling

## Important Patterns and Preferences

- **File Organization**: Group by feature and function
- **Component Structure**: Clear separation of concerns with focused components
- **Styling Preference**: CSS Modules or styled-components
- **State Management**: React Context for global state, component state for local
- **TypeScript Usage**: Strong typing for props, state, and function parameters
- **Responsive Design**: Using fluid layouts and media queries for breakpoints

## Developer Context

- Developer is new to coding in general, including React, TypeScript, and Tailwind
- Implementation should focus on small, understandable modules with detailed explanations
- Code should be self-documenting with descriptive naming and minimal comments
- No single-line comments; docstrings only for complex logic when necessary
- Explanations should be provided in task completion messages, not in code comments
- Each component change should be explained in detail: what it does and why
- Visual feedback should be frequent to connect code changes with UI updates

## Learnings and Insights

- The Figma design provides both light and dark mode versions, ensuring we have a clear visual target
- Content-first approach for blog development will help prioritize functionality
- Starting with the core/MVP features before adding more complex functionality
- Planning for future features like comments and search, but not implementing yet
- Focusing on good developer experience and maintainable code patterns
- Taking an educational approach with each implementation step
- Breaking down complex concepts into smaller, more digestible parts
