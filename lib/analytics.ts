"use client";

import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getApps } from "firebase/app";

const trackEvent = async (eventName: string) => {
  if (typeof window === "undefined") return;

  const supported = await isSupported();
  if (!supported || getApps().length === 0) return;

  const analytics = getAnalytics();
  logEvent(analytics, eventName);
};

// Sosyal medya eventleri
export const trackGithubOpen = () => trackEvent("github_open");
export const trackLinkedinOpen = () => trackEvent("linkedin_open");
export const trackTwitterOpen = () => trackEvent("twitter_open");

// Uygulama eventleri
export const trackAboutOpen = () => trackEvent("about_open");
export const trackProjectsOpen = () => trackEvent("projects_open");
export const trackSkillsOpen = () => trackEvent("skills_open");
export const trackContactOpen = () => trackEvent("contact_open");
export const trackSettingsOpen = () => trackEvent("settings_open");

// CV indirme
export const trackCvDownload = () => trackEvent("cv_download");

// Sayfa görüntüleme
export const trackPageView = () => trackEvent("page_view");

// Dil değişikliği
export const trackLanguageChange = (lang: string) =>
  trackEvent(`language_change_${lang}`);
