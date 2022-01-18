import { Episode } from "./episode";
import { supabase } from "./db.server";

export type Season = {
  index: number;
  episodes: Episode[];
};

export async function listSeasons(series: number): Promise<Season[]> {
  const { data, error } = await supabase()
    .from("seasons")
    .select(
      `
      *,
      episodes (
        index,
        season_id,
        summary,
        paintings (
          title,
          canvas
        )
      ),
      series!inner(*)
    `
    )
    .eq("series.index", series);

  return data as Season[];
}

export async function getSeason(
  series: number,
  index: number
): Promise<Season | null> {
  const { data } = await supabase()
    .from("seasons")
    .select("*, series!inner(*)")
    .eq("index", index)
    .eq("series.index", series)
    .limit(1)
    .single();

  return data as Season | null;
}
