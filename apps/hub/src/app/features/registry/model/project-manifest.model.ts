export interface ProjectManifest {
  id: string;
  name: string;
  tagline: string;
  status: string;
  category: string[];
  stack: string[];
  demoUrl: string;
  repoUrl: string;
  backendRepoUrl: string | null;
  docsUrl: string | null;
  accentColor: string;
  coverImage: string;
  screenshots: string[];
  problem: string | null;
  architectureDiagram: string | null;
  featured: boolean;
  order: number;
}
