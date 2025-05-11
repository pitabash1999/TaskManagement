import React from "react";
import { Link } from "react-router-dom";

const NoTaskUser = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 sm:p-8 text-center">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-base-100 dark:bg-base-200 rounded-xl p-6 sm:p-8 shadow-sm">
        {/* Icon - responsive sizing */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        {/* Message - responsive text sizing */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
          No tasks available
        </h3>
      </div>
    </div>
  );
};

export default NoTaskUser;
