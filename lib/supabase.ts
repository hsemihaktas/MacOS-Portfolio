import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Supabase Storage base URL
export const STORAGE = `${supabaseUrl}/storage/v1/object/public`;

// Kısa yardımcılar
export const storageImg = (path: string) => `${STORAGE}/images${path}`;
export const storageAsset = (path: string) => `${STORAGE}/assets${path}`;

/**
 * Supabase Image Transformation
 * object/ → render/image/ + width/quality parametreleri
 *
 * Kullanım:
 *   transformImg(url, { width: 800, quality: 80 })
 *   transformImg(url, { width: 400 })  // proje kartları için
 */
export function transformImg(
  url: string,
  opts: { width?: number; quality?: number } = {},
): string {
  if (!url || !url.includes("supabase.co/storage")) return url;

  // /storage/v1/object/public/ → /storage/v1/render/image/public/
  const base = url.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/",
  );

  const params = new URLSearchParams();
  if (opts.width) params.set("width", String(opts.width));
  if (opts.quality) params.set("quality", String(opts.quality ?? 80));
  // WebP çıktısı için (Supabase auto-detect destekliyorsa)
  params.set("format", "origin"); // tarayıcıya bırak, next/image zaten WebP yapar

  return `${base}?${params.toString()}`;
}
