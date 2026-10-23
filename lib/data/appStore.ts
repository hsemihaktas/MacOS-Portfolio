import { Language } from "../types";
import { projectDefinitions } from "./projects";

// ─────────────────────────────────────────────────────────────
// apps dizisi otomatik türetilir:
// projectDefinitions içinde appStore alanı olan tüm mobil projeler
// burada listelenir — ayrıca elle veri girişi gerekmez.
// ─────────────────────────────────────────────────────────────
const DEVELOPER = {
  tr: "Hasan Semih Aktaş",
  en: "Hasan Semih Aktas",
};

function getApps(lang: Language) {
  return projectDefinitions
    .filter((p) => p.platform === "mobile" && p.appStore)
    .map((p) => ({
      id: p.id,
      title: p[lang].title,
      subtitle: p.appStore![lang].subtitle,
      developer: DEVELOPER[lang],
      category: p.appStore![lang].category,
      rating: p.appStore!.rating,
      age: p.appStore!.age,
      chart: p.appStore![lang].chart,
      version: p.appStore!.version,
      size: p.appStore!.size,
      description: p[lang].description,
      icon: p.appStore!.icon,
      screenshots: p.appStore!.screenshots,
      appStoreUrl: p.appStoreLink ?? "",
      playStoreUrl: p.androidStoreLink ?? "",
    }));
}

// ─────────────────────────────────────────────────────────────
// Featured: App Store'un hero bölümü (elle ayarlanır)
// ─────────────────────────────────────────────────────────────
const featured = {
  tr: {
    title: "LİBLİFY",
    subtitle: "Büyüyen Kitaplık",
    description: "Okuma alışkanlığını keyifli bir ritüele dönüştür.",
    image: "/images/Liblify/cover.png",
  },
  en: {
    title: "LIBLIFY",
    subtitle: "Growing Library",
    description: "Turn reading into an enjoyable daily ritual.",
    image: "/images/Liblify/cover.png",
  },
};

export const appStoreData = {
  tr: {
    title: "App Store",
    featured: featured.tr,
    labels: {
      search: "Ara",
      suggestedApps: "Önerilen Uygulamalar",
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
    apps: getApps("tr"),
  },
  en: {
    title: "App Store",
    featured: featured.en,
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
    apps: getApps("en"),
  },
};
