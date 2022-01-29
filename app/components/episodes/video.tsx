import { Episode } from "~/episode";
import { paintingSrc } from "~/painting";

const iframeUrl = (url: string) => {
  const parsed = new URL(url);
  const version = parsed.searchParams.get("v") ?? "";
  return `https://www.youtube.com/embed/${version}`;
};

export default function Video({ episode }: { episode: Episode }) {
  switch (episode.type) {
    case "paid":
      return (
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
                This is a paid video available at {episode.url}
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
                <div className="bg-white rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-indigo-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      );
    case "embedded":
      return (
        <iframe
          className="rounded-lg shadow-lg object-cover object-center w-full h-80"
          src={iframeUrl(episode.url)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    default:
      return (
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
                  <circle opacity="0.9" cx={42} cy={42} r={42} fill="white" />
                  <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      );
  }
}
