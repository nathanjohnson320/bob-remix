import { createClient } from "@supabase/supabase-js";

export const supabase = () => {
  // Globals are from cloudflare secrets
  // @ts-ignore
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { fetch });
};
