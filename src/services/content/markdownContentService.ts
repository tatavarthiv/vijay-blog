import fm from "front-matter";
import type { BlogPost, Project } from "../../types/content";
import type { ContentService } from "./contentService";

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

          return {
            slug:
              ((attributes as Record<string, unknown>).slug as string) ||
              this.extractSlugFromPath(path),
            title:
              ((attributes as Record<string, unknown>).title as string) ||
              "Untitled",
            content: body,
            date:
              ((attributes as Record<string, unknown>).date as string) ||
              new Date().toISOString(),
            excerpt: (attributes as Record<string, unknown>).excerpt as
              | string
              | undefined,
            tags:
              ((attributes as Record<string, unknown>).tags as string[]) || [],
            coverImage: (attributes as Record<string, unknown>).coverImage as
              | string
              | undefined,
          };
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

      // Parse projects
      this.projects = Object.entries(projectModules).map(([path, content]) => {
        const { attributes, body } = fm(content as string);

        return {
          id: (attributes as any).slug || this.extractSlugFromPath(path),
          title: (attributes as any).title || "Untitled Project",
          slug: (attributes as any).slug || this.extractSlugFromPath(path),
          description: (attributes as any).description || "",
          content: body,
          tags: (attributes as any).tags || [],
          imageUrl: (attributes as any).imageUrl,
          links: {
            github: (attributes as any).github,
            demo: (attributes as any).demo,
          },
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
