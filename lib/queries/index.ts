import { supabase } from "@/lib/supabase";
import type { Language, Project } from "@/lib/types";
import type {
  ProjectRow,
  AboutRow,
  ExperienceRow,
  SkillCategoryRow,
  SkillRow,
} from "@/lib/database.types";

// ── Projects ──────────────────────────────────────────────────────────────────
export async function fetchProjectItems(lang: Language): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");

  if (error || !data) return [];
  const rows = data as ProjectRow[];

  return rows.map((row) => ({
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
  }));
}

// ── About ─────────────────────────────────────────────────────────────────────
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

// ── Skills ────────────────────────────────────────────────────────────────────
export async function fetchSkillCategories(lang: Language) {
  const { data: cats } = await supabase
    .from("skill_categories")
    .select("*, skills(*)")
    .order("sort_order");

  if (!cats) return [];
  const catRows = cats as (SkillCategoryRow & { skills: SkillRow[] })[];

  return catRows.map((cat: SkillCategoryRow & { skills: SkillRow[] }) => ({
    name: lang === "tr" ? cat.name_tr : cat.name_en,
    items: (cat.skills ?? [])
      .sort((a: SkillRow, b: SkillRow) => a.sort_order - b.sort_order)
      .map((s: SkillRow) => s.name),
  }));
}

// ── App Store apps (projects'ten türer) ───────────────────────────────────────
export async function fetchAppStoreApps(lang: Language) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("platform", "mobile")
    .not("app_store_meta", "is", null)
    .order("sort_order");

  if (error || !data) return [];
  const appData = data as ProjectRow[];

  const DEVELOPER = { tr: "Hasan Semih Aktaş", en: "Hasan Semih Aktas" };

  return appData.map((row) => {
    const meta = row.app_store_meta as Record<string, unknown>;
    const locMeta = (meta?.[lang] as Record<string, string>) ?? {};
    return {
      id: row.id,
      title: lang === "tr" ? row.title_tr : row.title_en,
      subtitle: locMeta.subtitle ?? "",
      developer: DEVELOPER[lang],
      category: locMeta.category ?? "",
      rating: (meta?.rating as number) ?? 0,
      age: (meta?.age as string) ?? "4+",
      chart: locMeta.chart ?? "",
      version: (meta?.version as string) ?? "1.0.0",
      size: (meta?.size as string) ?? "",
      description: lang === "tr" ? row.description_tr : row.description_en,
      icon: (meta?.icon as string) ?? "",
      screenshots: (meta?.screenshots as string[]) ?? [],
      appStoreUrl: row.app_store_link ?? "",
      playStoreUrl: row.android_store_link ?? "",
    };
  });
}
