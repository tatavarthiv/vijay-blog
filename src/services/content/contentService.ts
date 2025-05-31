import type { BlogPost, Project } from "../../types/content";

export interface ContentService {
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
  getProjectBySlug(slug: string): Promise<Project | null>;
}
