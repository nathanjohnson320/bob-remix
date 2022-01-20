import { FormEvent } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link,
  Form,
  ActionFunction,
  redirect,
  useSubmit,
  useTransition,
} from "remix";
import { Series, listSeries, getSeries } from "~/series";
import { Season, listSeasons, getSeason } from "~/season";
import { Episode } from "~/episode";

export const loader: LoaderFunction = async ({ params }) => {
  const series = await listSeries();
  const selectedSeries = series.find((s) => s.index === Number(params.series));

  if (!selectedSeries) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const seasons = await listSeasons(selectedSeries.index);
  const selectedSeason = seasons.find((s) => s.index === Number(params.season));

  if (!selectedSeason) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return {
    series: series.map((s) => ({ index: s.index, title: s.title })),
    seasons: seasons.map((s) => s.index),
    selectedSeries,
    selectedSeason,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const s = Number(formData.get("series"));
  const sz = Number(formData.get("season"));

  const series = await getSeries(s);
  const season = await getSeason(s, sz);

  return redirect(`/series/${series?.index ?? 1}/season/${season?.index ?? 1}`);
};

const paintingSrc = (series: Series, season: Season, episode: Episode) => {
  return `/img/series/${series.index}/season/${season.index}/${episode.index}.jpg`;
};

const episodeLabel = (season: Season, episode: Episode) => {
  return `S${season.index.toString().padStart(2, "0")}E${episode.index
    .toString()
    .padStart(2, "0")}`;
};

export default function Season() {
  const { series, selectedSeries, seasons, selectedSeason } = useLoaderData();
  const submit = useSubmit();
  const { state } = useTransition();

  function handleChange(e: FormEvent<HTMLFormElement>) {
    submit(e.currentTarget, { replace: true });
  }

  return (
    <div>
      <div className="relative bg-gray-50 pt-16 px-4 lg:pt-24 lg:px-8 sm:px-6">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Browse Episodes
            </h2>
          </div>
          <div className="px-3 my-5">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <Form method="post" onChange={handleChange}>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="series"
                  defaultValue={selectedSeries.index}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {series.map(
                    ({ index, title }: { index: number; title: string }) => (
                      <option key={index} value={index}>
                        {title}
                      </option>
                    )
                  )}
                </select>

                <select
                  name="season"
                  defaultValue={selectedSeason.index}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {seasons.map((index: number) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto grid gap-5 lg:grid-cols-3 lg-max-w-none">
        {state === "idle"
          ? selectedSeason.episodes.map((episode: Episode) => (
              <Link
                key={`${selectedSeason.index}-${episode.index}`}
                to={`/series/${selectedSeries.index}/season/${selectedSeason.index}/episode/${episode.index}`}
                className="cursor-pointer flex flex-col rounded-lg shadow-lg overflow-hidden no-underline"
              >
                <div className="flex-shrink-0 flex justify-center">
                  <img
                    src={paintingSrc(selectedSeries, selectedSeason, episode)}
                    alt={episode.paintings[0].title}
                    loading="lazy"
                    className="h-72"
                  ></img>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-indigo-600">
                      <p className="hover:underline">
                        {`${episodeLabel(selectedSeason, episode)} - ${
                          episode.paintings[0].canvas
                        }`}
                      </p>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {episode.paintings[0].title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {episode.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : Array(13)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`${i}`}
                  className="cursor-pointer flex flex-col rounded-lg shadow-lg overflow-hidden no-underline animate-pulse"
                >
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="h-72 w-full bg-gray-300"></div>
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-indigo-600 rounded-md mb-2 w-24"></div>
                      <div className="w-36 bg-black h-6"></div>
                      <p className="mt-3 h-12 bg-gray-500"></p>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
}
