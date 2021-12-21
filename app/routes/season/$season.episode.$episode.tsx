import { LoaderFunction, useLoaderData } from "remix";
import { getSeasons } from "~/data";
import { Color, Episode, Tool } from "~/types";
import { VideoCameraIcon } from "@heroicons/react/solid";

export const loader: LoaderFunction = ({ params: { season, episode } }) => {
  const seasons = getSeasons();

  return {
    episode: seasons
      ?.find((s) => s.index.toString() === season)
      ?.episodes.find((e) => e.index.toString() === episode),
  };
};

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const iframeUrl = (url: string) => {
  const parsed = new URL(url);
  const version = parsed.searchParams.get('v') ?? '';
  return `https://www.youtube.com/embed/${version}`;
}

export default function Episode() {
  const { episode } = useLoaderData();

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div>
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              {`${episode.painting.canvas} Canvas`}
            </h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {episode.painting.title}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-2">
            <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  <iframe
                    className="rounded-lg shadow-lg object-cover object-center w-full h-80"
                    src={iframeUrl(episode.url)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <VideoCameraIcon
                    className="flex-none w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2">{episode.painting.artist.name}</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="text-base max-w-prose mx-auto lg:max-w-none">
              <p className="text-lg text-gray-500">{episode.summary}</p>
            </div>


            <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
              <p>Tools</p>
              <ul>
                {episode.painting.tools.map((tool: Tool) => (
                  <li key={tool.name}>
                    <a rel="noreferrer" target="_blank" href={tool.url}>
                      {toTitleCase(tool.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
              <p>Colors</p>

              {episode.painting.colors.map((color: Color) => (
                <div className="flex items-center" key={color.name}>
                  <p
                    className="w-4 h-4 rounded mr-4 border"
                    style={{ backgroundColor: `#${color.hex}` }}
                  ></p>
                  <a rel="noreferrer" target="_blank" href={color.url}>
                    {toTitleCase(color.name)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
