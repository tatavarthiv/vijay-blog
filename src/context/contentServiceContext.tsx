import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ContentService } from "../services/content/contentService";
import { FileContentService } from "../services/content/fileContentService";

// Create a context with a null default value
const ContentServiceContext = createContext<ContentService | null>(null);

// Provider component that will wrap the application
export function ContentServiceProvider({ children }: { children: ReactNode }) {
  // Create an instance of the file-based content service
  const contentService = new FileContentService();

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
