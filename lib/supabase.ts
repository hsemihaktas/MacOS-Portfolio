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
