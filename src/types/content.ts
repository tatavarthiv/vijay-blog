export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  links?: {
    github?: string;
    demo?: string;
    [key: string]: string | undefined;
  };
}
