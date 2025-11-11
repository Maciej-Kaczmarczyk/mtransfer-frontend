import React from "react";

const FileCard = ({ title, size, createdAt }) => {
  return (
    <div className="w-full min-w-[220px] max-w-[280px] aspect-4/3 p-3 sm:p-4 bg-white rounded-xl flex flex-col items-start justify-between shadow-md ring-1 ring-blue-300 transition-transform hover:scale-[1.02] hover:shadow-lg duration-300">
      <div className="flex justify-between items-start w-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 truncate">{title}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6 hover:cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div className="flex flex-col gap-1 w-full mt-2">
        <p className="text-gray-700 text-sm sm:text-base">{(size / 1024).toFixed(1)} KB</p>
        <p className="text-xs sm:text-sm text-gray-600">
          Dodano: <span className="text-gray-700 font-semibold">{new Date(createdAt).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="flex justify-between items-center w-full ring-1 ring-gray-300 py-2 px-2 rounded-lg mt-3">
        <p className="text-xs sm:text-sm font-semibold truncate max-w-[60%]">przykładowy link</p>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  hover:cursor-pointer">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
      </div>
    </div>
  );
};

export default FileCard;
