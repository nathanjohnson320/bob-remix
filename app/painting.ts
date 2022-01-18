import { Artist } from "./artist";
import { Tool } from "./tool";
import { Color } from "./color";

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
