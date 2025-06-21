import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ContentService } from "../services/content/contentService";
import { SupabaseContentService } from "../services/content/supabaseContentService";

// Create a context with a null default value
const ContentServiceContext = createContext<ContentService | null>(null);

// Provider component that will wrap the application
export function ContentServiceProvider({ children }: { children: ReactNode }) {
  // Create an instance of the Supabase-based content service
  const contentService = new SupabaseContentService();

  return (
    <ContentServiceContext.Provider value={contentService}>
      {children}
    </ContentServiceContext.Provider>
  );
}

// Custom hook for using the content service
export function useContentService(): ContentService {
  const context = useContext(ContentServiceContext);

  if (!context) {
    throw new Error(
      "useContentService must be used within a ContentServiceProvider"
    );
  }

  return context;
}
