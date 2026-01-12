import { AppID } from "./types";

export const INITIAL_Z_INDEX = 10;

export const APPS: { id: AppID; title: string; iconUrl: string }[] = [
  {
    id: "about",
    title: "About Me",
    iconUrl: "/images/icons/about.png",
  },
  {
    id: "app-store",
    title: "App Store",
    iconUrl: "/images/icons/AppStore.png",
  },
  {
    id: "projects",
    title: "Projeler",
    iconUrl: "/images/icons/devFolder.png",
  },
  {
    id: "activity-monitor",
    title: "Sistem",
    iconUrl: "/images/icons/taskManager.png",
  },
  {
    id: "contact",
    title: "Mail",
    iconUrl: "/images/icons/mail.png",
  },
  {
    id: "settings",
    title: "Ayarlar",
    iconUrl: "/images/icons/settings.png",
  },
];
