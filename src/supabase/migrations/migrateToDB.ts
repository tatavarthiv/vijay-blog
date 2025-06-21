import { createClient } from "@supabase/supabase-js";
import { blogPosts } from "../../data/blogPostData";
import { projects } from "../../data/projectsData";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error("Error: .env.local file not found!");
  process.exit(1);
}

/**
 * Utility script to migrate static data to Supabase database
 * Run this once to populate your Supabase tables with the existing content
 */
async function migrateToDB() {
  console.log("Starting migration to Supabase...");

  // Initialize Supabase client
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials. Check your .env.local file.");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Migrate blog posts
    console.log(`Migrating ${blogPosts.length} blog posts...`);

    for (const post of blogPosts) {
      try {
        const { error } = await supabase.from("posts").insert({
          slug: post.slug,
          title: post.title,
          content: post.content,
          date: post.date,
          excerpt: post.excerpt || null,
          cover_image: post.coverImage || null,
          tags: post.tags || [],
          published: true,
        });

        if (error) {
          console.error(
            `Error migrating blog post "${post.title}":`,
            error.message
          );
          console.error("Details:", error);
        } else {
          console.log(`✅ Migrated blog post: ${post.title}`);
        }
      } catch (err) {
        console.error(`Exception migrating blog post "${post.title}":`, err);
      }
    }

    // Migrate projects
    console.log(`\nMigrating ${projects.length} projects...`);

    for (const project of projects) {
      try {
        // Let Supabase generate the UUID instead of using our own
        const { error } = await supabase.from("projects").insert({
          // Remove id field to let Supabase generate a UUID
          slug: project.slug,
          title: project.title,
          description: project.description,
          content: project.content,
          image_url: project.imageUrl || null,
          tags: project.tags || [],
          github_url: project.links?.github || null,
          demo_url: project.links?.demo || null,
        });

        if (error) {
          console.error(
            `Error migrating project "${project.title}":`,
            error.message
          );
          console.error("Details:", error);
        } else {
          console.log(`✅ Migrated project: ${project.title}`);
        }
      } catch (err) {
        console.error(`Exception migrating project "${project.title}":`, err);
      }
    }

    console.log("\nMigration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Execute the migration
migrateToDB();
