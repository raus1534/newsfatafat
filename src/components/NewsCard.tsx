import { Clock, ExternalLink, Share2 } from "lucide-react";
import React, { useState } from "react";
import { CustomToast } from "./CustomToast";
import { NewsCardProps } from "../types";

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  urlToImage,
  url,
  source,
  publishedAt,
}) => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleShareClick = (): void => {
    if (navigator.share) {
      // Attempt to use the Web Share API if supported
      navigator
        .share({
          title: title,
          url: url,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback for unsupported platforms: Copy the link to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          // Show custom toast on successful copy
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
        });
      } else {
        // Fallback: Open the link in a new tab
        window.open(url, "_blank");
      }
    }
  };

  return (
    <div className="w-72">
      <div className="relative overflow-hidden transition-all duration-500 bg-white border shadow-md dark:bg-gray-800/90 rounded-2xl hover:shadow-xl border-gray-100/10 dark:border-gray-700/30 backdrop-blur-sm">
        {/* Premium Content Indicator */}
        <div className="absolute z-20 flex space-x-2 top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
            {source}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          className="absolute z-20 top-3 right-3 p-1.5 bg-white/30 hover:bg-white/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40 rounded-full backdrop-blur-md transition-all duration-300"
          onClick={handleShareClick}
        >
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
              (e.target as HTMLImageElement).src = "/api/placeholder/400/320";
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
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
      </div>

      {/* Custom Toast */}
      {toastVisible && (
        <CustomToast
          message="Link copied to clipboard!"
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
};

export default NewsCard;
