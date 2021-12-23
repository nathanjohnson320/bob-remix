export type Series = {
  index: number;
  title: string;
  seasons: Season[];
};

export type Season = {
  index: number;
  episodes: Episode[];
};

export type Episode = {
  index: number;
  premier_date: string;
  duration: string;
  summary: string;
  url: string;
  seasonId: number;
  painting: Painting;
};

export type Painting = {
  title: string;
  height: number;
  width: number;
  canvas: string;
  episodeId: number;
  artist: Artist;
  tools: Tool[];
  colors: Color[];
};

export type Artist = {
  name: string;
};

export type Tool = {
  name: string;
  url: string;
};

export type Color = {
  hex: string;
  name: string;
  url: string;
};
