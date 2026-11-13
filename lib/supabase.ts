import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Supabase Storage base URL
export const STORAGE = `${supabaseUrl}/storage/v1/object/public`;

// Kısa yardımcılar
export const storageImg = (path: string) => `${STORAGE}/images${path}`;
export const storageAsset = (path: string) => `${STORAGE}/assets${path}`;

/**
 * Supabase image helper — Next.js <Image> kendi optimizasyonunu (WebP/AVIF) yapıyor.
 * Supabase render/image endpoint'i ücretli (Pro) olduğu için doğrudan URL kullanıyoruz.
 */
export function transformImg(
  url: string,
  _opts: { width?: number; quality?: number } = {},
): string {
  return url; // no-op: Next.js handles optimization via next.config.ts
}
