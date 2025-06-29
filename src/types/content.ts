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
  slug: string;
  description: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
}
