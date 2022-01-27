import { Artist } from "./artist";
import { Tool } from "./tool";
import { Color } from "./color";
import { Series } from "./series";
import { Season } from "./season";
import { Episode } from "./episode";

export type Painting = {
  title: string;
  height: number;
  width: number;
  canvas: string;
  episode_id: number;
  artist: Artist;
  tools: Tool[];
  colors: Color[];
};

export const paintingSrc = (
  series: Series,
  season: Season,
  episode: Episode
) => {
  return `/img/series/${series.index}/season/${season.index}/${episode.index}.jpg`;
};
