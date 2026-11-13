// Supabase tablo tipleri
// Supabase dashboard → Settings → API → TypeScript Types ile otomatik güncellenebilir

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number;
          sort_order: number;
          platform: "mobile" | "web" | "discord-bot";
          tags: string[];
          image: string;
          gallery: string[] | null;
          website_link: string | null;
          github_link: string | null;
          app_store_link: string | null;
          android_store_link: string | null;
          app_store_meta: Json | null;
          title_tr: string;
          title_en: string;
          description_tr: string;
          description_en: string;
          features_tr: string[] | null;
          features_en: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      about: {
        Row: {
          id: number;
          name_tr: string;
          name_en: string;
          role_tr: string;
          role_en: string;
          summary_tr: string;
          summary_en: string;
          location_tr: string;
          location_en: string;
          education_tr: string;
          education_en: string;
          email: string;
        };
        Insert: Omit<Database["public"]["Tables"]["about"]["Row"], never>;
        Update: Partial<Database["public"]["Tables"]["about"]["Insert"]>;
      };
      experience: {
        Row: {
          id: number;
          sort_order: number;
          company: string;
          role_tr: string;
          role_en: string;
          period_tr: string;
          period_en: string;
          description_tr: string;
          description_en: string;
        };
        Insert: Omit<Database["public"]["Tables"]["experience"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["experience"]["Insert"]>;
      };
      skill_categories: {
        Row: {
          id: number;
          sort_order: number;
          name_tr: string;
          name_en: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["skill_categories"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["skill_categories"]["Insert"]
        >;
      };
      skills: {
        Row: {
          id: number;
          category_id: number;
          sort_order: number;
          name: string;
        };
        Insert: Omit<Database["public"]["Tables"]["skills"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["skills"]["Insert"]>;
      };
    };
  };
}

// Convenience types
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type AboutRow = Database["public"]["Tables"]["about"]["Row"];
export type ExperienceRow = Database["public"]["Tables"]["experience"]["Row"];
export type SkillCategoryRow =
  Database["public"]["Tables"]["skill_categories"]["Row"];
export type SkillRow = Database["public"]["Tables"]["skills"]["Row"];

// site_config
export interface SiteConfigRow {
  id: number;
  wallpaper_url: string;
  profile_picture_url: string;
  og_image_url: string | null;
  cv_url: string | null;
  icons: Record<string, string>;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  updated_at: string;
}
