export type AppID =
  | "about"
  | "projects"
  | "skills"
  | "settings"
  | "contact"
  | "activity-monitor"
  | "app-store";
export type Language = "tr" | "en";

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  params?: any;
  // added to enable passing language to specific apps if needed through window params
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
  platform: "mobile" | "web";
}

export interface AppStoreProps {
  lang: Language;
  isDarkMode: boolean;
}
