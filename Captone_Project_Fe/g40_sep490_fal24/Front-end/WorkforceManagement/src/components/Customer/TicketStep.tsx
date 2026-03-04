export default function TicketStep({ step }: { step: number }) {
  return (
    <div className="w-full p-4">
      <ol className="flex justify-center items-center w-full text-xs text-gray-900 font-medium sm:text-base">
        
        {/* Step 1 */}
        <li className="relative w-full flex justify-center items-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              className={`w-full border-t-2 ${
                step > 1 ? "border-indigo-600" : "border-gray-200"
              }`}
            ></div>
          </div>
          <div className="relative flex flex-col items-center">
            <span
              className={`w-10 h-10 ${
                step >= 1 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
              } border-2 ${
                step >= 1 ? "border-transparent" : "border-indigo-600"
              } rounded-full flex justify-center items-center text-sm`}
            >
              {step > 1 ? (
                <svg
                  className="w-5 h-5 stroke-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                1
              )}
            </span>
            <span
              className={`mt-2 text-sm font-medium ${
                step >= 1 ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              Submit Ticket
            </span>
          </div>
        </li>

        {/* Step 2 */}
        <li className="relative w-full flex justify-center items-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              className={`w-full border-t-2 ${
                step > 2 ? "border-indigo-600" : "border-gray-200"
              }`}
            ></div>
          </div>
          <div className="relative flex flex-col items-center">
            <span
              className={`w-10 h-10 ${
                step >= 2 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
              } border-2 ${
                step >= 2 ? "border-transparent" : "border-indigo-600"
              } rounded-full flex justify-center items-center text-sm`}
            >
              {step > 2 ? (
                <svg
                  className="w-5 h-5 stroke-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                2
              )}
            </span>
            <span
              className={`mt-2 text-sm font-medium ${
                step >= 2 ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              Terms and Policy
            </span>
          </div>
        </li>

        {/* Step 3 */}
        <li className="relative w-full flex justify-center items-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div
              className={`w-full border-t-2 ${
                step > 3 ? "border-indigo-600" : "border-gray-200"
              }`}
            ></div>
          </div>
          <div className="relative flex flex-col items-center">
            <span
              className={`w-10 h-10 ${
                step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
              } border-2 ${
                step >= 3 ? "border-transparent" : "border-gray-300"
              } rounded-full flex justify-center items-center text-sm`}
            >
              {step > 3 ? (
                <svg
                  className="w-5 h-5 stroke-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                3
              )}
            </span>
            <span
              className={`mt-2 text-sm font-medium ${
                step >= 3 ? "text-indigo-600" : "text-gray-900"
              }`}
            >
              Verify Ticket
            </span>
          </div>
        </li>
      </ol>
    </div>
  );
}
