import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://cvewclemzxacroepwmwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZXdjbGVtenhhY3JvZXB3bXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MTc2MDgsImV4cCI6MjA4MzA5MzYwOH0.bVrkhN3eCDV3Q7ucs3EqYS0HxeSqf9h7MXjMw0faG88";

const createSafeClient = () => {
  try {
    if (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY) {
      return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          storage: typeof window !== "undefined" ? localStorage : undefined,
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
  } catch (err) {
    console.warn("Supabase client initialization skipped:", err);
  }

  return {
    functions: {
      invoke: async () => ({
        data: null,
        error: new Error("Supabase is not configured or unavailable"),
      }),
    },
  } as any;
};

export const supabase = createSafeClient();