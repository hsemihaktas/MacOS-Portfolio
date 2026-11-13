import { supabase } from "@/lib/supabase";
import type { Language, Project, AppStoreApp } from "@/lib/types";
import type {
  ProjectRow,
  AboutRow,
  ExperienceRow,
  SkillCategoryRow,
  SkillRow,
  SiteConfigRow,
} from "@/lib/database.types";

// ── Project Mapper ────────────────────────────────────────────────────────────
function mapProject(row: ProjectRow, lang: Language): Project {
  return {
    id: row.id,
    title: lang === "tr" ? row.title_tr : row.title_en,
    description: lang === "tr" ? row.description_tr : row.description_en,
    tags: row.tags ?? [],
    image: row.image,
    gallery: row.gallery ?? undefined,
    features:
      lang === "tr"
        ? (row.features_tr ?? undefined)
        : (row.features_en ?? undefined),
    githubLink: row.github_link ?? undefined,
    websiteLink: row.website_link ?? undefined,
    appStoreLink: row.app_store_link ?? undefined,
    androidStoreLink: row.android_store_link ?? undefined,
    platform: row.platform,
  };
}

// ── App Store Mapper ──────────────────────────────────────────────────────────
function mapAppStoreApp(
  row: ProjectRow,
  lang: Language,
  developerName: string,
): AppStoreApp {
  const meta = (row.app_store_meta as Record<string, unknown>) ?? {};
  const locMeta = (meta[lang] as Record<string, string>) ?? {};
  return {
    id: row.id,
    title: lang === "tr" ? row.title_tr : row.title_en,
    subtitle: locMeta.subtitle ?? "",
    developer: developerName,
    category: locMeta.category ?? "",
    rating: (meta.rating as number) ?? 0,
    age: (meta.age as string) ?? "4+",
    chart: locMeta.chart ?? "",
    version: (meta.version as string) ?? "1.0.0",
    size: (meta.size as string) ?? "",
    description: lang === "tr" ? row.description_tr : row.description_en,
    icon: (meta.icon as string) ?? "",
    screenshots: (meta.screenshots as string[]) ?? [],
    appStoreUrl: row.app_store_link ?? "",
    playStoreUrl: row.android_store_link ?? "",
  };
}

// ── TEK SEFERDE TÜM PORTFOLYO VERİLERİNİ ÇEKEN OPTİMİZE FONKSİYON ────────────
export async function fetchAllPortfolioData() {
  const [
    { data: projectsData },
    { data: aboutData },
    { data: expData },
    { data: catsData },
    { data: configData },
  ] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("about").select("*").eq("id", 1).single(),
    supabase.from("experience").select("*").order("sort_order"),
    supabase.from("skill_categories").select("*, skills(*)").order("sort_order"),
    supabase.from("site_config").select("*").eq("id", 1).single(),
  ]);

  const projectsRows = (projectsData ?? []) as ProjectRow[];
  const aboutRow = (aboutData ?? null) as AboutRow | null;
  const expRows = (expData ?? []) as ExperienceRow[];
  const catRows = (catsData ?? []) as (SkillCategoryRow & { skills: SkillRow[] })[];
  const config = (configData ?? null) as SiteConfigRow | null;

  // Projeler
  const projectsTr = projectsRows.map((r) => mapProject(r, "tr"));
  const projectsEn = projectsRows.map((r) => mapProject(r, "en"));

  // Geliştirici adı
  const devTr = aboutRow?.name_tr ?? "Hasan Semih Aktaş";
  const devEn = aboutRow?.name_en ?? "Hasan Semih Aktas";

  // About
  const aboutTr = aboutRow
    ? {
        name: aboutRow.name_tr,
        role: aboutRow.role_tr,
        summary: aboutRow.summary_tr,
        location: aboutRow.location_tr,
        education: aboutRow.education_tr,
        email: aboutRow.email,
        experience: expRows.map((e) => ({
          company: e.company,
          role: e.role_tr,
          period: e.period_tr,
          desc: e.description_tr,
        })),
      }
    : null;

  const aboutEn = aboutRow
    ? {
        name: aboutRow.name_en,
        role: aboutRow.role_en,
        summary: aboutRow.summary_en,
        location: aboutRow.location_en,
        education: aboutRow.education_en,
        email: aboutRow.email,
        experience: expRows.map((e) => ({
          company: e.company,
          role: e.role_en,
          period: e.period_en,
          desc: e.description_en,
        })),
      }
    : null;

  // Skills
  const mapSkills = (lang: Language) =>
    catRows.map((cat) => ({
      name: lang === "tr" ? cat.name_tr : cat.name_en,
      items: (cat.skills ?? [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => s.name),
    }));

  const skillsTr = mapSkills("tr");
  const skillsEn = mapSkills("en");

  // App Store Apps (projelerden süzülür, ek sorgu gerekmez)
  const mobileProjects = projectsRows.filter(
    (r) => r.platform === "mobile" && r.app_store_meta,
  );
  const appsTr = mobileProjects.map((r) => mapAppStoreApp(r, "tr", devTr));
  const appsEn = mobileProjects.map((r) => mapAppStoreApp(r, "en", devEn));

  return {
    projectsTr,
    projectsEn,
    aboutTr,
    aboutEn,
    skillsTr,
    skillsEn,
    appsTr,
    appsEn,
    config,
  };
}

// ── Bireysel Fonksiyonlar (Geriye Uyumluluk İçin) ──────────────────────────────
export async function fetchProjectItems(lang: Language): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  if (error || !data) return [];
  return (data as ProjectRow[]).map((row) => mapProject(row, lang));
}

export async function fetchAbout(lang: Language) {
  const [{ data: about }, { data: exp }] = await Promise.all([
    supabase.from("about").select("*").eq("id", 1).single(),
    supabase.from("experience").select("*").order("sort_order"),
  ]);

  if (!about) return null;
  const aboutRow = about as AboutRow;
  const expRows = (exp ?? []) as ExperienceRow[];

  return {
    name: lang === "tr" ? aboutRow.name_tr : aboutRow.name_en,
    role: lang === "tr" ? aboutRow.role_tr : aboutRow.role_en,
    summary: lang === "tr" ? aboutRow.summary_tr : aboutRow.summary_en,
    location: lang === "tr" ? aboutRow.location_tr : aboutRow.location_en,
    education: lang === "tr" ? aboutRow.education_tr : aboutRow.education_en,
    email: aboutRow.email,
    experience: expRows.map((e) => ({
      company: e.company,
      role: lang === "tr" ? e.role_tr : e.role_en,
      period: lang === "tr" ? e.period_tr : e.period_en,
      desc: lang === "tr" ? e.description_tr : e.description_en,
    })),
  };
}

export async function fetchSkillCategories(lang: Language) {
  const { data: cats } = await supabase
    .from("skill_categories")
    .select("*, skills(*)")
    .order("sort_order");

  if (!cats) return [];
  const catRows = cats as (SkillCategoryRow & { skills: SkillRow[] })[];

  return catRows.map((cat) => ({
    name: lang === "tr" ? cat.name_tr : cat.name_en,
    items: (cat.skills ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => s.name),
  }));
}

export async function fetchAppStoreApps(lang: Language, developerName?: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("platform", "mobile")
    .not("app_store_meta", "is", null)
    .order("sort_order");

  if (error || !data) return [];
  const appData = data as ProjectRow[];
  const devName = developerName ?? (lang === "tr" ? "Hasan Semih Aktaş" : "Hasan Semih Aktas");
  return appData.map((row) => mapAppStoreApp(row, lang, devName));
}

export async function fetchSiteConfig(): Promise<SiteConfigRow | null> {
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) return null;
  return data as SiteConfigRow;
}
