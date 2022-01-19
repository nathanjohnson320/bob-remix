import { createClient } from "@supabase/supabase-js";

export const supabase = () => {
  // Globals are from cloudflare secrets
  // https://github.com/cloudflare/workers-types#using-bindings
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    fetch: fetch.bind(globalThis),
  });
};
