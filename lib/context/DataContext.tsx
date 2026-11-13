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
} from "@/lib/queries";
import type { Language } from "@/lib/types";

type DataShape = typeof DATA;

const DataContext = createContext<DataShape>(DATA);
const LoadingContext = createContext<boolean>(true);

export function DataProvider({
  children,
  lang,
  onReady,
}: {
  children: ReactNode;
  lang: Language;
  onReady?: () => void;
}) {
  const [data, setData] = useState<DataShape>(DATA);
  const [loading, setLoading] = useState(true);
  // Ref ile sakla — inline arrow değişse de effect yeniden çalışmaz
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
        ] = await Promise.all([
          fetchProjectItems("tr"),
          fetchProjectItems("en"),
          fetchAbout("tr"),
          fetchAbout("en"),
          fetchSkillCategories("tr"),
          fetchSkillCategories("en"),
          fetchAppStoreApps("tr"),
          fetchAppStoreApps("en"),
        ]);

        if (cancelled) return;

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
  }, []); // sadece bir kez çalışır

  return (
    <LoadingContext.Provider value={loading}>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </LoadingContext.Provider>
  );
}

export const usePortfolioData = () => useContext(DataContext);
export const usePortfolioLoading = () => useContext(LoadingContext);
