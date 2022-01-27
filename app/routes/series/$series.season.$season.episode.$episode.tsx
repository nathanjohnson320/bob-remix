import { LoaderFunction, useLoaderData } from "remix";
import { Episode, getEpisode } from "~/episode";
import { Color } from "~/color";
import { Tool } from "~/tool";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { paintingSrc } from "~/painting";

export const loader: LoaderFunction = async ({ params }) => {
  const episode = await getEpisode(
    Number(params.series),
    Number(params.season),
    Number(params.episode)
  );
  if (!episode) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return {
    episode,
  };
};

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};

const iframeUrl = (url: string) => {
  const parsed = new URL(url);
  const version = parsed.searchParams.get("v") ?? "";
  return `https://www.youtube.com/embed/${version}`;
};

export default function Episode() {
  const { episode } = useLoaderData();
  const painting = episode.paintings[0];

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
        <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
          <div>
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              {`${painting?.canvas} Canvas`}
            </h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {painting?.title}
            </h3>
          </div>
        </div>
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative lg:row-start-1 lg:col-start-2">
            <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                  {episode.embeddable ? (
                    <iframe
                      className="rounded-lg shadow-lg object-cover object-center w-full h-80"
                      src={iframeUrl(episode.url)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                      <svg
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                        width={640}
                        height={784}
                        fill="none"
                        viewBox="0 0 640 784"
                        aria-hidden="true"
                      >
                        <defs>
                          <pattern
                            id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                            x={118}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x={0}
                              y={0}
                              width={4}
                              height={4}
                              className="text-gray-200"
                              fill="currentColor"
                            />
                          </pattern>
                        </defs>
                        <rect
                          y={72}
                          width={640}
                          height={640}
                          className="text-gray-50"
                          fill="currentColor"
                        />
                        <rect
                          x={118}
                          width={404}
                          height={784}
                          fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                        />
                      </svg>
                      <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                        <a
                          href={episode.url}
                          rel="noopener noreferrer nofollow"
                          target="_blank"
                          className="cursor-pointer relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="sr-only">
                            This video is only available on YouTube
                          </span>
                          <img
                            className="w-full"
                            src={paintingSrc(
                              episode.seasons.series,
                              episode.seasons,
                              episode
                            )}
                            alt={episode.paintings[0].title}
                          />
                          <div
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <svg
                              className="h-20 w-20 text-indigo-500"
                              fill="currentColor"
                              viewBox="0 0 84 84"
                            >
                              <circle
                                opacity="0.9"
                                cx={42}
                                cy={42}
                                r={42}
                                fill="white"
                              />
                              <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <figcaption className="mt-3 flex text-sm text-gray-500">
                  <VideoCameraIcon
                    className="flex-none w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2">{painting?.artists?.name}</span>
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
                {painting.tools.map((tool: Tool) => (
                  <li key={tool.name}>
                    <a
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                      href={tool.url}
                    >
                      {toTitleCase(tool.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
              <p>Colors</p>

              {painting.colors.map((color: Color) => (
                <div className="flex items-center" key={color.name}>
                  <p
                    className="w-4 h-4 rounded mr-4 border"
                    style={{ backgroundColor: `#${color.hex}` }}
                  ></p>
                  <a
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    href={color.url}
                  >
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
