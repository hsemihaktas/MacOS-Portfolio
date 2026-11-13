// ─── Static UI labels only — dynamic data (projects/about/skills) comes from Supabase ───
import { menuData, settingsData } from "./common";
import { contactData } from "./contact";

// Boş başlangıç değerleri — DataContext Supabase'den doldurur
const emptyProjectsData = {
  tr: {
    title: "Projelerim",
    viewProject: "İncele",
    liveDemo: "Canlı Demo",
    repo: "Kaynak Kod",
    back: "Geri Dön",
    stack: "Teknolojiler",
    featuresTitle: "Öne Çıkanlar",
    screenshotsTitle: "Ekran Görüntüleri",
    items: [] as import("@/lib/types").Project[],
  },
  en: {
    title: "My Projects",
    viewProject: "View",
    liveDemo: "Live Demo",
    repo: "Source Code",
    back: "Go Back",
    stack: "Stack",
    featuresTitle: "Highlights",
    screenshotsTitle: "Screenshots",
    items: [] as import("@/lib/types").Project[],
  },
};

const emptyAboutData = {
  tr: {
    name: "",
    role: "",
    summary: "",
    experience: [] as {
      company: string;
      role: string;
      period: string;
      desc: string;
    }[],
    education: "",
    location: "",
    email: "",
  },
  en: {
    name: "",
    role: "",
    summary: "",
    experience: [] as {
      company: string;
      role: string;
      period: string;
      desc: string;
    }[],
    education: "",
    location: "",
    email: "",
  },
};

const emptySkillsData = {
  tr: {
    title: "Yeteneklerim",
    subtitle: "Kullandığım teknolojiler",
    categories: [] as { name: string; items: string[] }[],
  },
  en: {
    title: "My Skills",
    subtitle: "Technologies I use",
    categories: [] as { name: string; items: string[] }[],
  },
};

const STORAGE =
  "https://yawdxcqkbkhlrxmalfdw.supabase.co/storage/v1/object/public";

const emptyAppStoreData = {
  tr: {
    title: "App Store",
    featured: {
      title: "LİBLİFY",
      subtitle: "Büyüyen Kitaplık",
      description: "Okuma alışkanlığını keyifli bir ritüele dönüştür.",
      image: `${STORAGE}/images/Liblify/cover.png`,
    },
    labels: {
      search: "Ara",
      suggestedApps: "Önerilen",
      seeAll: "Hepsini Gör",
      get: "İNDİR",
      inAppPurchases: "Uygulama İçi\nSatın Alımlar",
      back: "Geri Dön",
      ratings: "OYLAMA",
      age: "YAŞ",
      yearsOld: "Yaş",
      chart: "LİSTE",
      developer: "GELİŞTİRİCİ",
      information: "Bilgiler",
      provider: "Sağlayıcı",
      size: "Boyut",
      category: "Kategori",
      compatibility: "Uyumluluk",
      compatibilityDevices: "iPhone / iPad / Mac",
      languages: "Diller",
      currentLanguage: "Türkçe",
      ageRating: "Yaş Sınırı",
    },
    categories: [
      { id: "discover", name: "Keşfet", icon: "Compass" },
      { id: "arcade", name: "Arcade", icon: "Gamepad2" },
      { id: "create", name: "Yaratıcılık", icon: "Palette" },
      { id: "work", name: "Üretkenlik", icon: "Briefcase" },
      { id: "develop", name: "Geliştirici", icon: "Code2" },
    ],
    apps: [] as unknown[],
  },
  en: {
    title: "App Store",
    featured: {
      title: "LIBLIFY",
      subtitle: "Growing Library",
      description: "Turn reading into an enjoyable daily ritual.",
      image: `${STORAGE}/images/Liblify/cover.png`,
    },
    labels: {
      search: "Search",
      suggestedApps: "Suggested Apps",
      seeAll: "See All",
      get: "GET",
      inAppPurchases: "In-App\nPurchases",
      back: "Back",
      ratings: "RATINGS",
      age: "AGE",
      yearsOld: "Years Old",
      chart: "CHART",
      developer: "DEVELOPER",
      information: "Information",
      provider: "Provider",
      size: "Size",
      category: "Category",
      compatibility: "Compatibility",
      compatibilityDevices: "iPhone / iPad / Mac",
      languages: "Languages",
      currentLanguage: "English",
      ageRating: "Age Rating",
    },
    categories: [
      { id: "discover", name: "Discover", icon: "Compass" },
      { id: "arcade", name: "Arcade", icon: "Gamepad2" },
      { id: "create", name: "Creativity", icon: "Palette" },
      { id: "work", name: "Productivity", icon: "Briefcase" },
      { id: "develop", name: "Developer", icon: "Code2" },
    ],
    apps: [] as unknown[],
  },
};

export const DATA = {
  tr: {
    menu: menuData.tr.menu,
    apps: menuData.tr.apps,
    settings: settingsData.tr,
    contact: contactData.tr,
    about: emptyAboutData.tr,
    skills: emptySkillsData.tr,
    projects: emptyProjectsData.tr,
    appStore: emptyAppStoreData.tr,
  },
  en: {
    menu: menuData.en.menu,
    apps: menuData.en.apps,
    settings: settingsData.en,
    contact: contactData.en,
    about: emptyAboutData.en,
    skills: emptySkillsData.en,
    projects: emptyProjectsData.en,
    appStore: emptyAppStoreData.en,
  },
};
