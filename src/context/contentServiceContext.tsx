import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { ContentService } from "../services/content/contentService";
import { MarkdownContentService } from "../services/content/markdownContentService";

// Create a context with a null default value
const ContentServiceContext = createContext<ContentService | null>(null);

// Provider component that will wrap the application
export function ContentServiceProvider({ children }: { children: ReactNode }) {
  const contentService = useMemo(() => new MarkdownContentService(), []);

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
