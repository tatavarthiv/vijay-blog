import matter from "gray-matter";

export interface MarkdownContent {
  content: string;
  data: {
    [key: string]: any;
  };
}

export function parseMarkdown(markdownText: string): MarkdownContent {
  const { content, data } = matter(markdownText);
  return { content, data };
}
