import { Season } from "./season";
import { supabase } from "./db.server";

export type Series = {
  index: number;
  title: string;
  seasons: Season[];
};

export async function listSeries(): Promise<Series[]> {
  const { data } = await supabase().from("series").select(`
  index,
  title,
  seasons (
    index
  )
`);

  return data as Series[];
}

export async function getSeries(index: number): Promise<Series | null> {
  const { data } = await supabase()
    .from("series")
    .select("*")
    .eq("index", index)
    .limit(1)
    .single();

  return data as Series | null;
}
