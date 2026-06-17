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
  gifs?: string[];
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

export interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;            // path under /public, e.g. '/images/company1.png'
  description: string;
  competencies: string[];  // shown as LinkedIn-style tags on expand
}

export interface RadarAxis {
  label: string;
  value: number;           // 0–100, your proficiency / weight in your toolkit
}