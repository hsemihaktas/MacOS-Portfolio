-- ============================================================
--  MacOS Portfolio — Supabase Schema
--  Project: hsemihaktas (yawdxcqkbkhlrxmalfdw)
--  Last updated: 2026-11-13
-- ============================================================
-- Run this in Supabase SQL Editor to recreate the full schema.
-- Storage buckets (images, assets) must be created manually
-- via the Supabase Dashboard → Storage.
-- ============================================================


-- ── Sequences ────────────────────────────────────────────────────────────────

CREATE SEQUENCE IF NOT EXISTS projects_id_seq        START WITH 24  INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS experience_id_seq      START WITH 1   INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS skill_categories_id_seq START WITH 1  INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS skills_id_seq          START WITH 1   INCREMENT BY 1;


-- ── projects ─────────────────────────────────────────────────────────────────
-- Ordered by id DESC in the app (newest project = highest id = shown first).
-- To add a new project just INSERT without specifying id — auto-increment handles it.

CREATE TABLE IF NOT EXISTS public.projects (
  id                  bigint        NOT NULL DEFAULT nextval('projects_id_seq'),
  platform            text          NOT NULL,             -- 'mobile' | 'web' | 'discord-bot'
  tags                text[]        NOT NULL DEFAULT '{}',
  image               text          NOT NULL,             -- Supabase Storage public URL
  gallery             text[]                DEFAULT NULL,
  website_link        text                  DEFAULT NULL,
  github_link         text                  DEFAULT NULL,
  app_store_link      text                  DEFAULT NULL,
  android_store_link  text                  DEFAULT NULL,
  app_store_meta      jsonb                 DEFAULT NULL, -- Mobile-only: rating, screenshots, etc.
  title_tr            text          NOT NULL,
  title_en            text          NOT NULL,
  description_tr      text          NOT NULL,
  description_en      text          NOT NULL,
  features_tr         text[]                DEFAULT '{}',
  features_en         text[]                DEFAULT '{}',
  created_at          timestamptz           DEFAULT now(),
  updated_at          timestamptz           DEFAULT now(),

  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_platform_check CHECK (
    platform IN ('mobile', 'web', 'discord-bot')
  )
);

ALTER SEQUENCE projects_id_seq OWNED BY public.projects.id;

-- ── about ────────────────────────────────────────────────────────────────────
-- Single row (id = 1). Edit via Supabase Table Editor.

CREATE TABLE IF NOT EXISTS public.about (
  id              integer NOT NULL DEFAULT 1,
  name_tr         text    NOT NULL,
  name_en         text    NOT NULL,
  role_tr         text    NOT NULL,
  role_en         text    NOT NULL,
  summary_tr      text    NOT NULL,
  summary_en      text    NOT NULL,
  location_tr     text    NOT NULL,
  location_en     text    NOT NULL,
  education_tr    text    NOT NULL,
  education_en    text    NOT NULL,
  email           text    NOT NULL,

  CONSTRAINT about_pkey PRIMARY KEY (id)
);

-- ── experience ────────────────────────────────────────────────────────────────
-- Ordered by sort_order ASC in the app.

CREATE TABLE IF NOT EXISTS public.experience (
  id              integer NOT NULL DEFAULT nextval('experience_id_seq'),
  sort_order      integer NOT NULL DEFAULT 0,
  company         text    NOT NULL,
  role_tr         text    NOT NULL,
  role_en         text    NOT NULL,
  period_tr       text    NOT NULL,
  period_en       text    NOT NULL,
  description_tr  text    NOT NULL,
  description_en  text    NOT NULL,

  CONSTRAINT experience_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE experience_id_seq OWNED BY public.experience.id;

-- ── skill_categories ─────────────────────────────────────────────────────────
-- Ordered by sort_order ASC. Each category holds many skills.

CREATE TABLE IF NOT EXISTS public.skill_categories (
  id          integer NOT NULL DEFAULT nextval('skill_categories_id_seq'),
  sort_order  integer NOT NULL DEFAULT 0,
  name_tr     text    NOT NULL,
  name_en     text    NOT NULL,

  CONSTRAINT skill_categories_pkey PRIMARY KEY (id)
);

ALTER SEQUENCE skill_categories_id_seq OWNED BY public.skill_categories.id;

-- ── skills ───────────────────────────────────────────────────────────────────
-- Ordered by sort_order ASC within each category.

CREATE TABLE IF NOT EXISTS public.skills (
  id          integer NOT NULL DEFAULT nextval('skills_id_seq'),
  category_id integer NOT NULL,
  sort_order  integer NOT NULL DEFAULT 0,
  name        text    NOT NULL,

  CONSTRAINT skills_pkey              PRIMARY KEY (id),
  CONSTRAINT skills_category_id_fkey  FOREIGN KEY (category_id)
    REFERENCES public.skill_categories (id) ON DELETE CASCADE
);

ALTER SEQUENCE skills_id_seq OWNED BY public.skills.id;

-- ── site_config ───────────────────────────────────────────────────────────────
-- Single row (id = 1). Controls all assets & links shown in the portfolio.
-- Edit via Supabase Table Editor — no code changes needed.

CREATE TABLE IF NOT EXISTS public.site_config (
  id                        integer     NOT NULL DEFAULT 1,
  wallpaper_url             text        NOT NULL,          -- Supabase Storage public URL
  wallpaper_position_mobile text                DEFAULT '0% center',
  wallpaper_position_desktop text               DEFAULT 'center',
  profile_picture_url       text        NOT NULL,          -- Supabase Storage public URL
  og_image_url              text                DEFAULT NULL,
  cv_url                    text                DEFAULT NULL,
  icons                     jsonb               DEFAULT '{}', -- { "about": "...", "safari": "...", ... }
  github_url                text                DEFAULT 'https://github.com/hsemihaktas',
  linkedin_url              text                DEFAULT 'https://linkedin.com/in/hsemihaktas',
  twitter_url               text                DEFAULT 'https://x.com/hsemihaktas',
  updated_at                timestamptz         DEFAULT now(),

  CONSTRAINT site_config_pkey PRIMARY KEY (id)
);


-- ── Row Level Security ────────────────────────────────────────────────────────
-- All tables are publicly readable (portfolio is public).
-- Writes are blocked from the browser (use Supabase Dashboard or service key).

ALTER TABLE public.projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config     ENABLE ROW LEVEL SECURITY;

-- Public read policies (snake_case names match the actual DB policy names)
CREATE POLICY "public_read_projects"        ON public.projects        FOR SELECT USING (true);
CREATE POLICY "public_read_about"           ON public.about           FOR SELECT USING (true);
CREATE POLICY "public_read_experience"      ON public.experience      FOR SELECT USING (true);
CREATE POLICY "public_read_categories"      ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "public_read_skills"          ON public.skills          FOR SELECT USING (true);
CREATE POLICY "public_read_site_config"     ON public.site_config     FOR SELECT USING (true);


-- ── Storage buckets (create manually in Dashboard) ────────────────────────────
-- Bucket: images   — project cover images and screenshot galleries
--   Path pattern: images/{ProjectName}/cover.png
--                 images/{ProjectName}/store/{1..n}.png
--
-- Bucket: assets   — wallpaper, app icons, profile photo, CV
--   Path pattern: assets/wallpaper.jpg
--                 assets/icons/{app-id}.png
--                 assets/profile.jpg
--                 assets/cv.pdf
--
-- Both buckets must have "Public" access enabled so storage URLs work
-- without authentication.
