export interface NavItem {
  id: string;
  title: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  gifUrl?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  period: string;
  institution: string;
  degree: string;
  description?: string;
}