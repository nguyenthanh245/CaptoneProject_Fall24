export default function Loading() {
  return (
      <div className="grid gap-3">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin border-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
          >
            <g id="Group 1000003699">
              <circle
                id="Ellipse 715"
                cx="31.9989"
                cy="31.8809"
                r="24"
                stroke="#E5E7EB"
                strokeWidth="6"
              />
              <path
                id="Ellipse 716"
                d="M42.111 53.6434C44.9694 52.3156 47.5383 50.4378 49.6709 48.1172C51.8036 45.7967 53.4583 43.0787 54.5406 40.1187C55.6229 37.1586 56.1115 34.0143 55.9787 30.8654C55.8458 27.7165 55.094 24.6246 53.7662 21.7662C52.4384 18.9078 50.5606 16.339 48.24 14.2063C45.9194 12.0736 43.2015 10.4189 40.2414 9.33662C37.2814 8.25434 34.1371 7.76569 30.9882 7.89856C27.8393 8.03143 24.7473 8.78323 21.889 10.111"
                stroke="url(#paint0_linear_13416_7438)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_13416_7438"
                x1="0.122767"
                y1="20.2221"
                x2="20.3448"
                y2="63.7544"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-black text-sm font-normal leading-snug">
          Loading...
        </span>
      </div>
  );
}
