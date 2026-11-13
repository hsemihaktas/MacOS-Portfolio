import { AppID } from "./types";

export const INITIAL_Z_INDEX = 10;

export const APPS: { id: AppID; title: string; iconUrl: string }[] = [
  {
    id: "about",
    title: "About Me",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/about.png",
  },
  {
    id: "safari",
    title: "Safari",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/safari.png",
  },
  {
    id: "app-store",
    title: "App Store",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/AppStore.png",
  },
  {
    id: "projects",
    title: "Projeler",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/devFolder.png",
  },
  {
    id: "activity-monitor",
    title: "Sistem",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/taskManager.png",
  },
  {
    id: "contact",
    title: "Mail",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/mail.png",
  },
  {
    id: "settings",
    title: "Ayarlar",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/settings.png",
  },
  {
    id: "terminal",
    title: "Terminal",
    iconUrl: "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public/assets/icons/terminal.png",
  },
];
