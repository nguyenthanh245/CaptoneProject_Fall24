import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-600 py-20">
        <div className="container mx-auto text-center relative">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            SOC Management & Vulnerability Scanning
          </h1>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Secure your website with our advanced vulnerability scanning and SOC
            team management system. Detect and fix security issues with ease.
          </p>
          <button
            className="px-8 py-4 bg-white !text-indigo-700 font-semibold rounded-lg shadow-lg !hover:bg-indigo-100 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/customer/ticket")}
          >
            Start Scanning
          </button>
        </div>
        {/* Loại bỏ background overlay nếu không cần */}

      </header>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-center items-center mb-6">
                <svg
                  fill="#000000"
                  height="64px"
                  width="64px"
                  version="1.1"
                  id="XMLID_140_"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  xmlSpace="preserve"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="vulnerability">
                      <g>
                        <path d="M13,24h-2v-2c-4.7-0.5-8.5-4.2-9-9H0v-2h2c0.5-4.7,4.2-8.5,9-9V0h2v2c4.7,0.5,8.5,4.2,9,9h2v2h-2c-0.5,4.7-4.2,8.5-9,9V24 z M13,17.9v2c3.6-0.5,6.5-3.3,6.9-6.9h-2C17.5,15.5,15.5,17.5,13,17.9z M4.1,13c0.5,3.6,3.3,6.5,6.9,6.9v-2 c-2.5-0.4-4.5-2.4-4.9-4.9H4.1z M13,13v2.9c1.4-0.4,2.5-1.5,2.9-2.9H13z M8.1,13c0.4,1.4,1.5,2.5,2.9,2.9V13H8.1z M17.9,11h2 c-0.4-3.6-3.3-6.5-6.9-6.9v2C15.5,6.5,17.5,8.5,17.9,11z M13,11h2.9c-0.4-1.4-1.5-2.5-2.9-2.9V11z M8.1,11H11V8.1 C9.6,8.5,8.5,9.6,8.1,11z M4.1,11h2C6.5,8.5,8.5,6.5,11,6.1v-2C7.4,4.5,4.5,7.4,4.1,11z"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Vulnerability Scanning
              </h3>
              <p className="text-gray-600">
                Automatically scan your website for security vulnerabilities and
                receive detailed reports.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-center items-center mb-6">
                <svg
                  fill="#e70d0d"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="64px"
                  height="64px"
                  viewBox="0 0 122.699 122.699"
                  xmlSpace="preserve"
                  stroke="#e70d0d"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="1.472388"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <circle cx="19.5" cy="12.2" r="12.1"></circle>
                      <path d="M6,66.699h1.2v24c0,3.301,2.7,6,6,6h12.6c3.3,0,6-2.699,6-6V89.3c-1.1-2.101-1.8-4.5-1.8-7v-31.4c0-6.1,3.7-11.4,9-13.7 v-2.4c0-3.3-2.7-6-6-6H6c-3.3,0-6,2.7-6,6v25.9C0,64,2.6,66.699,6,66.699z"></path>
                      <circle cx="103.3" cy="12.2" r="12.1"></circle>
                      <path d="M83.699,34.7v2.4c5.301,2.3,9,7.6,9,13.7v31.3c0,2.5-0.6,4.9-1.799,7v1.4c0,3.3,2.699,6,6,6h12.6c3.3,0,6-2.7,6-6v-24 h1.199c3.301,0,6-2.7,6-6V34.7c0-3.3-2.699-6-6-6h-27C86.4,28.7,83.699,31.399,83.699,34.7z"></path>
                      <path d="M39.1,50.899L39.1,50.899v9.8v21.6c0,3.3,2.7,6,6,6h2.3v28.3c0,3.3,2.7,6,6,6h16.1c3.3,0,6-2.7,6-6v-28.4h2.3 c3.3,0,6-2.699,6-6V60.7v-9.8l0,0c0-3.3-2.7-6-6-6H45.1C41.7,44.899,39.1,47.6,39.1,50.899z"></path>
                      <circle cx="61.4" cy="26" r="13.9"></circle>
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Team Management
              </h3>
              <p className="text-gray-600">
                Manage your security team, assign tasks, and track the progress
                of your team members.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex justify-center items-center mb-6">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M11 19.5H21"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 12.5H21"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 5.5H21"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M3 5.5L4 6.5L7 3.5"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M3 12.5L4 13.5L7 10.5"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M3 19.5L4 20.5L7 17.5"
                      stroke="#4788f0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Task Assignment
              </h3>
              <p className="text-gray-600">
                Easily assign tasks to your SOC team and ensure each member is
                aware of their responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
