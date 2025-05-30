import type { BlogPost, Project } from "../../types/content";
import type { ContentService } from "./contentService";
import { blogPosts as staticBlogPosts } from "../../data/blogPostData";

// Using Vite's import.meta.glob to import all project files
const projectFiles = import.meta.glob("../../data/projects/*.json", {
  eager: true,
});

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
    const projects: Project[] = [];

    try {
      console.log("Available project files:", Object.keys(projectFiles));

      // Process each project file
      for (const path in projectFiles) {
        try {
          console.log(`Processing project: ${path}`);
          const fileContent = projectFiles[path];
          console.log(`Project file content:`, fileContent);

          if (
            fileContent &&
            typeof fileContent === "object" &&
            "default" in fileContent
          ) {
            const projectData = (fileContent as { default: Project }).default;
            console.log(`Project data:`, projectData);

            projects.push({
              ...projectData,
              id: projectData.id || this.idFromPath(path),
            });
          } else {
            console.error(`Invalid project data format in ${path}`);
          }
        } catch (error) {
          console.error(`Error loading project file ${path}:`, error);
        }
      }
    } catch (error) {
      console.error("Error in getProjects:", error);
    }

    return projects;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((project) => project.id === id) || null;
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
