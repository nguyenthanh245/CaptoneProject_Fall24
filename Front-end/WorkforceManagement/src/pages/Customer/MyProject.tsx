import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllPentestRequestsAndProjects } from "../../services/customer-api";
import StatusStyle from "../../components/StatusStyle";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function MyProject() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchRequestAndProjects"],
    queryFn: async () => {
      const response = await getAllPentestRequestsAndProjects();
      return response;
    },
  });

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">My Projects</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a2 2 0 00-2 2v2H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V9a3 3 0 00-3-3h-3V4a2 2 0 00-2-2h-4zm0 2h4v2h-4V4zM4 9a1 1 0 011-1h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9z" />
          </svg>
        </div>
      </div>
      <div className="my-6 border-t border-gray-300"></div>
      <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-8 bg-white">
        <div className="relative">
          <button
            id="dropdownActionButton"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Filter
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            id="dropdownAction"
            className={`${
              dropdownOpen ? "" : "hidden"
            } absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
          >
            <ul
              className="py-1 text-sm text-gray-700"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Reward
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Promote
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Activate account
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search ticket by project name"
          />
        </div>
      </div>
      <table className="w-full text-sm text-gray-500 mt-4 text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project ID
            </th>
            <th scope="col" className="px-6 py-3">
              Request ID
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Estimated end time
            </th>
            <th scope="col" className="px-4 py-3">
              Vulnerability Detected
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data ? (
            data.data.map((request) =>
              request.projects.map((project) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{project.projectId}</td>
                  <td className="px-6 py-4">{request.pentestRequestId}</td>
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.startDate}</td>
                  <td className="px-6 py-4">{project.endDate}</td>
                  <td className="px-6 py-4">{project.vulnerabilityCount}</td>
                  <td className="px-6 py-4 ">
                    <StatusStyle
                      statusName={
                        project?.statusName === "ACTIVE"
                          ? "NEW VUL IMPORT"
                          : project?.statusName
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 text-white rounded-lg shadow-md ${
                        project.statusName != "ACTIVE"
                          ? "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={project.statusName == "ACTIVE"} // Vô hiệu hóa nút nếu chưa có teamId
                      onClick={() => {
                        navigate(`/project-details/${project.projectId}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                No project available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
