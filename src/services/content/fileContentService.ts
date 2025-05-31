import type { BlogPost, Project } from "../../types/content";
import type { ContentService } from "./contentService";
import { blogPosts as staticBlogPosts } from "../../data/blogPostData";
import { projects as staticProjects } from "../../data/projectsData";

export class FileContentService implements ContentService {
  async getBlogPosts(): Promise<BlogPost[]> {
    // Use the static blog posts data instead of loading from files
    // Already sorted by date, newest first
    return staticBlogPosts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
  }

  async getProjects(): Promise<Project[]> {
    // Use the static projects data instead of loading from files
    return staticProjects;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((project) => project.id === id) || null;
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((project) => project.slug === slug) || null;
  }

  // Helper method to generate slug from file path
  private slugFromPath(path: string): string {
    const filename = path.split("/").pop() || "";
    return filename.replace(/\.md$/, "");
  }

  // Helper method to generate id from file path
  private idFromPath(path: string): string {
    const filename = path.split("/").pop() || "";
    return filename.replace(/\.json$/, "");
  }
}
