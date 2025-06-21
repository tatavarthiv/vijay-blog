import { createClient } from "@supabase/supabase-js";
import type { BlogPost, Project } from "../../types/content";
import type { ContentService } from "./contentService";

// Database record types that match our Supabase schema
interface DbPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt: string | null;
  tags: string[] | null;
  cover_image: string | null;
  published: boolean;
}

interface DbProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[] | null;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
}

export class SupabaseContentService implements ContentService {
  private supabase;

  constructor() {
    // Initialize the Supabase client with environment variables
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
  }

  // Get all published blog posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await this.supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    return data.map(this.mapPostFromDb);
  }

  // Get a specific blog post by its slug
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await this.supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching blog post by slug:", error);
      return null;
    }

    return this.mapPostFromDb(data);
  }

  // Get all projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await this.supabase.from("projects").select("*");

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data.map(this.mapProjectFromDb);
  }

  // Get a specific project by its ID
  async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project by id:", error);
      return null;
    }

    return this.mapProjectFromDb(data);
  }

  // Get a specific project by its slug
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }

    return this.mapProjectFromDb(data);
  }

  // Helper method to map database post to BlogPost type
  private mapPostFromDb(post: DbPost): BlogPost {
    return {
      slug: post.slug,
      title: post.title,
      content: post.content,
      date: post.date,
      excerpt: post.excerpt || undefined,
      tags: post.tags || [],
      coverImage: post.cover_image || undefined,
    };
  }

  // Helper method to map database project to Project type
  private mapProjectFromDb(project: DbProject): Project {
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content,
      tags: project.tags || [],
      imageUrl: project.image_url || undefined,
      links: {
        github: project.github_url || undefined,
        demo: project.demo_url || undefined,
      },
    };
  }
}
