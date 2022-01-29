import { Painting } from "./painting";
import { supabase } from "./db";

export type Episode = {
  index: number;
  premier_date: string;
  duration: string;
  summary: string;
  url: string;
  season_id: number;
  paintings: Painting[];
  embeddable: boolean;
};

export async function getEpisode(
  series: number,
  season: number,
  index: number
): Promise<Episode> {
  const { data } = await supabase()
    .from("episodes")
    .select(
      `
    index,
    premier_date,
    duration,
    summary,
    url,
    embeddable,
    paintings (
      canvas,
      title,
      artists (
        name
      ),
      colors (
        name,
        hex,
        url
      ),
      tools (
        name,
        url
      )
    ),
    seasons!inner(
      *, 
      series!inner(*)
    )
  `
    )
    .eq("seasons.series.index", series)
    .eq("seasons.index", season)
    .eq("index", index)
    .order("name", { foreignTable: "paintings.colors" })
    .order("name", { foreignTable: "paintings.tools" })
    .limit(1)
    .single();

  return data as Episode;
}
