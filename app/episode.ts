import { Painting } from "./painting";
import { Season } from "./season";
import { supabase } from "./db";

enum EpisodeType {
  Embedded = "embedded",
  Paid = "paid",
  External = "external",
}

export type Episode = {
  index: number;
  premier_date: string;
  duration: string;
  summary: string;
  url: string;
  season_id: number;
  paintings: Painting[];
  seasons: Season;
  type: EpisodeType;
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
    type,
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
