import fm from "front-matter";
import type { BlogPost, Project } from "../../types/content";
import type { ContentService } from "./contentService";

// Define frontmatter interfaces
interface BlogPostFrontmatter {
  slug?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
}

interface ProjectFrontmatter {
  slug?: string;
  title?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}

export class MarkdownContentService implements ContentService {
  private posts: BlogPost[] = [];
  private projects: Project[] = [];
  private initialized = false;

  constructor() {
    this.initializeContent();
  }

  private async initializeContent() {
    if (this.initialized) return;

    try {
      // Import all markdown files from posts directory
      const postModules = import.meta.glob("/src/content/posts/*.md", {
        query: "?raw",
        import: "default",
        eager: true,
      });

      // Import all markdown files from projects directory
      const projectModules = import.meta.glob("/src/content/projects/*.md", {
        query: "?raw",
        import: "default",
        eager: true,
      });

      // Parse blog posts
      this.posts = Object.entries(postModules)
        .map(([path, content]) => {
          const { attributes, body } = fm(content as string);
          const frontmatter = attributes as BlogPostFrontmatter;

          return {
            slug: frontmatter.slug || this.extractSlugFromPath(path),
            title: frontmatter.title || "Untitled",
            content: body,
            date: frontmatter.date || new Date().toISOString(),
            excerpt: frontmatter.excerpt,
            tags: frontmatter.tags || [],
            coverImage: frontmatter.coverImage,
          };
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      // Parse projects
      this.projects = Object.entries(projectModules).map(([path, content]) => {
        const { attributes, body } = fm(content as string);
        const frontmatter = attributes as ProjectFrontmatter;

        return {
          id: frontmatter.slug || this.extractSlugFromPath(path),
          title: frontmatter.title || "Untitled Project",
          slug: frontmatter.slug || this.extractSlugFromPath(path),
          description: frontmatter.description || "",
          content: body,
          tags: frontmatter.tags || [],
          imageUrl: frontmatter.imageUrl,
        };
      });

      this.initialized = true;
    } catch (error) {
      console.error("Error initializing markdown content:", error);
      this.initialized = true; // Set to true to prevent infinite retries
    }
  }

  private extractSlugFromPath(path: string): string {
    // Extract filename without extension from path like '/src/content/posts/my-post.md'
    const filename = path.split("/").pop() || "";
    return filename.replace(".md", "");
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    await this.initializeContent();
    return this.posts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    await this.initializeContent();
    return this.posts.find((post) => post.slug === slug) || null;
  }

  async getProjects(): Promise<Project[]> {
    await this.initializeContent();
    return this.projects;
  }

  async getProjectById(id: string): Promise<Project | null> {
    await this.initializeContent();
    return this.projects.find((project) => project.id === id) || null;
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    await this.initializeContent();
    return this.projects.find((project) => project.slug === slug) || null;
  }
}
