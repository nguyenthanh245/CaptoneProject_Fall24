import { useNavigate } from "react-router-dom";

export default function TicketSuccess() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-4 max-w-lg mx-auto h-full md:h-auto">
        <div className="relative p-6 text-center bg-gray-50 rounded-lg shadow-lg">
          <div className="w-12 h-12 rounded-full bg-green-50 p-2 flex flex-col items-center justify-center mx-auto mb-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Success</span>
          </div>
          <div className="mb-6 text-xl font-semibold text-green-600">
            Successfully Submit Ticket
          </div>
          <div className="pb-2">
            Please wait while your ticket is being reviewed and approved.
          </div>
          <div>
            <a href="#" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200 ease-in-out"
            onClick={() => navigate("/")}
            >You can check the status of your ticket here.</a>
          </div>
          <div className="pt-4">
            <button
              type="button"
              className="py-2 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition"
              onClick={() => navigate("/customer/home")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
