import React from "react";
import { Clock, ExternalLink, Share2 } from "lucide-react";

const NewsCard = ({
  title,
  description,
  urlToImage,
  url,
  source,
  publishedAt,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="w-72">
      <div className="relative overflow-hidden transition-all duration-500 bg-white border shadow-md dark:bg-gray-800/90 rounded-2xl hover:shadow-xl border-gray-100/10 dark:border-gray-700/30 backdrop-blur-sm">
        {/* Premium Content Indicator */}
        <div className="absolute z-20 flex space-x-2 top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
            {source}
          </span>
          {/* {Math.random() > 0.5 && (
            <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg">
              PREMIUM
            </span>
          )} */}
        </div>

        {/* Bookmark Button */}
        <button className="absolute z-20 top-3 right-3 p-1.5 bg-white/30 hover:bg-white/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40 rounded-full backdrop-blur-md transition-all duration-300">
          <Share2 className="w-4 h-4 text-white" />
        </button>

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 animate-pulse" />
          <img
            src={urlToImage || "/news.jpg"}
            alt={title}
            className="object-cover w-full h-full transition-all duration-700 transform group-hover:scale-110"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/320";
            }}
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70" />

          {/* Time Stamp */}
          <div className="absolute flex items-center space-x-2 bottom-3 left-3 text-white/90">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">
              {formatDate(publishedAt || new Date())}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-3">
          {/* Category Tags */}
          {/* <div className="flex flex-wrap gap-2 mb-3">
            {["World", "Politics"].map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-blue-600 rounded-md dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
              >
                {tag}
              </span>
            ))}
          </div> */}

          {/* Title with enhanced typography */}
          <h3 className="mb-3 text-lg font-bold leading-tight text-gray-800 transition-colors duration-300 dark:text-stone-800 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title || "Breaking News"}
          </h3>

          {/* Description with improved readability */}
          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-700 line-clamp-3">
            {description ||
              "For an in-depth understanding and to explore all the details surrounding this story, click the link below to read the complete article."}
          </p>

          {/* Enhanced Call to Action */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:from-blue-700 active:to-blue-800 shadow-sm hover:shadow ring-1 ring-blue-600/50 hover:ring-blue-500/50 group/button"
            >
              <span className="relative">Read Full Story</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-all duration-300 group-hover/button:translate-x-0.5 group-hover/button:opacity-100 opacity-70" />
            </a>

            {/* Share/Engagement Stats */}
            {/* <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <span className="flex items-center text-xs">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path
                    fillRule="evenodd"
                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {Math.floor(Math.random() * 1000)}
              </span>
              <span className="flex items-center text-xs">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
                {Math.floor(Math.random() * 50)}
              </span>
            </div> */}
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
      </div>
    </div>
  );
};

export default NewsCard;
