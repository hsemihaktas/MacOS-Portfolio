export type AppID =
  | "about"
  | "projects"
  | "skills"
  | "settings"
  | "contact"
  | "activity-monitor"
  | "app-store"
  | "safari";
export type Language = "tr" | "en";

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  params?: {
    projectId?: number;
    filterTag?: string;
    url?: string;
    title?: string;
  } | null;
}

// Component-facing type — tek dil, flat yapı (component API değişmiyor)
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  gallery?: string[];
  features?: string[];
  githubLink?: string;
  websiteLink?: string;
  appStoreLink?: string;
  androidStoreLink?: string;
  platform: "mobile" | "web" | "discord-bot";
}

// App Store bölümü için mobil uygulama metadatası
export interface AppStoreMetadata {
  icon: string;
  screenshots: string[];
  rating: number;
  age: string;
  version: string;
  size: string;
  tr: { subtitle: string; category: string; chart: string };
  en: { subtitle: string; category: string; chart: string };
}

// Tek kaynak: bilingual proje tanımı
export interface ProjectDefinition {
  id: number;
  tags: string[];
  image: string;
  gallery?: string[]; // Projeye özel galeri; yoksa appStore.screenshots kullanılır
  platform: "mobile" | "web" | "discord-bot";
  websiteLink?: string;
  githubLink?: string;
  appStoreLink?: string;
  androidStoreLink?: string;
  appStore?: AppStoreMetadata; // Bu alan varsa App Store'da listelenir
  tr: { title: string; description: string; features?: string[] };
  en: { title: string; description: string; features?: string[] };
}

export interface AppStoreProps {
  lang: Language;
  isDarkMode: boolean;
}
