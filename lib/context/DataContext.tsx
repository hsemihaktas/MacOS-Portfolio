"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { DATA } from "@/lib/data";
import {
  fetchProjectItems,
  fetchAbout,
  fetchSkillCategories,
  fetchAppStoreApps,
  fetchSiteConfig,
} from "@/lib/queries";
import type { Language } from "@/lib/types";
import type { SiteConfigRow } from "@/lib/database.types";

type DataShape = typeof DATA;

const DataContext = createContext<DataShape>(DATA);
const LoadingContext = createContext<boolean>(true);
const SiteConfigContext = createContext<SiteConfigRow | null>(null);

export function DataProvider({
  children,
  lang: _lang,
  onReady,
}: {
  children: ReactNode;
  lang: Language;
  onReady?: () => void;
}) {
  const [data, setData] = useState<DataShape>(DATA);
  const [loading, setLoading] = useState(true);
  const [siteConfig, setSiteConfig] = useState<SiteConfigRow | null>(null);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [
          projectsTr,
          projectsEn,
          aboutTr,
          aboutEn,
          skillsTr,
          skillsEn,
          appsTr,
          appsEn,
          config,
        ] = await Promise.all([
          fetchProjectItems("tr"),
          fetchProjectItems("en"),
          fetchAbout("tr"),
          fetchAbout("en"),
          fetchSkillCategories("tr"),
          fetchSkillCategories("en"),
          fetchAppStoreApps("tr"),
          fetchAppStoreApps("en"),
          fetchSiteConfig(),
        ]);

        if (cancelled) return;

        if (config) setSiteConfig(config);

        // Kritik resimleri önceden yükle (boot kapanmadan önce)
        if (config) {
          const toPreload = [
            config.wallpaper_url,
            config.profile_picture_url,
            ...Object.values(config.icons ?? {}),
          ].filter(Boolean) as string[];

          await Promise.allSettled(
            toPreload.map(
              (url) =>
                new Promise<void>((resolve) => {
                  const img = new window.Image();
                  img.onload = () => resolve();
                  img.onerror = () => resolve(); // hata olsa da bekletme
                  img.src = url;
                }),
            ),
          );
        }

        setData((prev) => ({
          tr: {
            ...prev.tr,
            projects: { ...prev.tr.projects, items: projectsTr },
            about: aboutTr ?? prev.tr.about,
            skills: { ...prev.tr.skills, categories: skillsTr },
            appStore: { ...prev.tr.appStore, apps: appsTr },
          },
          en: {
            ...prev.en,
            projects: { ...prev.en.projects, items: projectsEn },
            about: aboutEn ?? prev.en.about,
            skills: { ...prev.en.skills, categories: skillsEn },
            appStore: { ...prev.en.appStore, apps: appsEn },
          },
        }));
      } catch (e) {
        console.error("DataContext load error:", e);
      } finally {
        if (!cancelled) {
          setLoading(false);
          onReadyRef.current?.();
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LoadingContext.Provider value={loading}>
      <SiteConfigContext.Provider value={siteConfig}>
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
      </SiteConfigContext.Provider>
    </LoadingContext.Provider>
  );
}

export const usePortfolioData = () => useContext(DataContext);
export const usePortfolioLoading = () => useContext(LoadingContext);
export const useSiteConfig = () => useContext(SiteConfigContext);
