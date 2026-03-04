import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllProjects } from "../../services/soc-manager-api";
import AssignModal from "../../components/SOCManager/AssignModal";
import TopVulnerability from "../../components/SOCManager/TopVulnerability";
import TopProjects from "../../components/SOCManager/TopProjects";
import SeverityCount from "../../components/SOCManager/SeverityCount";
import Loading from "../../components/Loading";
import CountVulStatusChart from "../../components/SOCManager/CountVulStatusChart";
import { useNavigate } from "react-router-dom";
import TeamManagementModal from "../../components/SOCManager/TeamManagementModal";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";
import StatusStyle from "../../components/StatusStyle";

export default function ProjectManagement() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowAssignModal, setIsShowAssignModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    number | undefined
  >();
  const [isShowTeamModal, setIsShowTeamModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["fetchProject", debouncedSearchString, currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllProjects({
        searchString,
        currentPage,
        pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto sm:rounded-lg cursor-default">
      <div className="flex flex-col space-y-4 p-5 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Project Management
          </h1>
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
      <SeverityCount />
      <div className="grid grid-cols-6 space-x-2 mt-4">
        <div className="col-span-2 border rounded-lg shadow-lg p-6 bg-white">
          <div className="text-2xl font-bold text-left mb-4 text-gray-700">
            Top Vulnerability
          </div>
          <TopVulnerability />
        </div>

        <div className="col-span-2 border rounded-lg shadow-lg p-6 bg-white">
          <div className="text-2xl font-bold text-left mb-4 text-gray-700">
            Top Projects
          </div>
          <TopProjects />
        </div>
        <div className="col-span-2">
          <CountVulStatusChart />
        </div>
      </div>
      <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
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
            placeholder="Search project by name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Description
            </th> */}
            <th scope="col" className="px-6 py-3">
              Team Id
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Est end time
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
              <td colSpan={7}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data
            ? data?.data.projects.map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  {/* <td className="px-6 py-4">{item.description}</td> */}
                  <td className="px-6 py-4">
                    {" "}
                    {item.teamId ? (
                      <span
                        className="text-blue-500 cursor-pointer hover:text-blue-700 font-bold"
                        onClick={() => {
                          setSelectedTeamId(item.teamId);
                          setIsShowTeamModal(true);
                        }}
                      >
                        Team {item.teamId}
                      </span>
                    ) : (
                      <span>No team assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                                    <td className="px-6 py-4 ">
                    <StatusStyle
                      statusName={
                        item?.statusName === "ACTIVE"
                          ? "NEW VUL IMPORT"
                          : item?.statusName
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className={`px-4 py-2 text-white rounded-lg shadow-md ${
                          item.teamId
                            ? "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!item.teamId} // Vô hiệu hóa nút nếu chưa có teamId
                        onClick={() => {
                          navigate(`/project-details/${item.id}`);
                        }}
                      >
                        Details
                      </button>
                      <button
                        className={`px-4 py-2 text-white rounded-lg shadow-md ${
                          item.teamId
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                        }`}
                        disabled={!!item.teamId} // Vô hiệu hóa nút nếu đã có teamId
                        onClick={() => {
                          setSelectedProjectId(item.id);
                          setIsShowAssignModal(true);
                        }}
                      >
                        Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : !isLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No project available.
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.projects.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalProjects}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value="10">10 Record</option>
              <option value="15">15 Record</option>
              <option value="20">20 Record</option>
              <option value="30">30 Record</option>
            </select>
          </div>
          {data && (
            <Pagination
              totalPage={data?.data.totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </nav>

      {isShowAssignModal && selectedProjectId && (
        <AssignModal
          setIsShowAssignModal={setIsShowAssignModal}
          selectedProjectId={selectedProjectId}
          refetch={refetch}
        />
      )}

      {isShowTeamModal && selectedTeamId && (
        <TeamManagementModal
          setIsShowTeamModal={setIsShowTeamModal}
          selectedTeamId={selectedTeamId}
        />
      )}
    </div>
  );
}
