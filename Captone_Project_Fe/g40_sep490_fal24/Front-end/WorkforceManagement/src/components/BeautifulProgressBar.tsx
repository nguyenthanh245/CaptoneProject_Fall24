const BeautifulProgressBar = ({ progress }: { progress: number }) => {  
  return (
    <div className="relative w-full mx-auto">
      {/* Background */}
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
        {/* Progress Bar */}
        <div
          className="h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Progress Label */}
      <div
        className="absolute top-0 left-0 h-6 flex items-center justify-center text-white text-sm font-bold"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
      {/* Icon */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-8 w-8 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center shadow-lg"
        style={{ left: `calc(${progress}% - 1rem)` }}
      >
        <svg
          className="w-4 h-4 text-purple-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM11 16v-4H8l4-5v4h3l-4 5z" />
        </svg>
      </div>
    </div>
  );
};

export default BeautifulProgressBar;
