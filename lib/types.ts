
export type AppID = 'about' | 'projects' | 'skills' | 'settings' | 'contact' | 'ai-asistan' | 'activity-monitor';
export type Language = 'tr' | 'en';

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  params?: any;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  gallery?: string[];
  features?: string[];
  link: string;
}
