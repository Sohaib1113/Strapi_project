// components/types.ts
export interface SEODataType {
  title: string;
  author?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  image?: string;
}

export interface GreetingType {
  name: string;
  title?: string;
  subtitle?: string;
}

export interface OpenSourceType {
  githubUserName?: string;
}