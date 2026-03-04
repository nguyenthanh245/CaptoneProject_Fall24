import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllTeams } from "../../services/soc-manager-api";
import Loading from "../../components/Loading";
import CreateTeamModal from "../../components/SOCManager/CreateTeamModal";
import TeamManagementModal from "../../components/SOCManager/TeamManagementModal";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";

export default function TeamManagement() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [isShowTeamModal, setIsShowTeamModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchAllTeam", debouncedSearchString, currentPage, pageSize],
    queryFn: async () => {
      const response = await getAllTeams({
        searchString,
        currentPage,
        pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });
  return (
    <div className="relative overflow-x-hidden sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Team Management
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.58.51.97 1.2.97 1.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
      </div>
      <div className="my-6 border-t border-gray-300"></div>
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
            placeholder="Search team by name"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
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
              Team Name
            </th>
            <th scope="col" className="px-6 py-3">
              Participating
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data ? (
            data.data.teams.map((item) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item.teamId}</td>
                <td className="px-6 py-4">{item.teamName}</td>
                <td className="px-6 py-4">
                  {item.isParticipating ? (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Participating
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div>
                      Not Participating
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      onClick={() => {
                        setIsShowTeamModal(true);
                        setSelectedTeamId(item.teamId);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No pentest request available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.teams.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalTeams}
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
      {/* Nút "Add Team" với tooltip */}
      <div className="flex justify-end p-5 relative">
        <div className="group relative">
          <button
            className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-50 ease-in-out"
            aria-label="Add Team"
            onClick={() => setIsShowCreateModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-50 ease-in-out whitespace-nowrap">
            Add a new team
          </span>
        </div>
      </div>

      {/* Modal */}
      {isShowCreateModal && (
        <CreateTeamModal
          setIsShowCreateModal={setIsShowCreateModal}
          refetch={refetch}
        />
      )}

      {isShowTeamModal && (
        <TeamManagementModal
          setIsShowTeamModal={setIsShowTeamModal}
          selectedTeamId={selectedTeamId}
        />
      )}
    </div>
  );
}
