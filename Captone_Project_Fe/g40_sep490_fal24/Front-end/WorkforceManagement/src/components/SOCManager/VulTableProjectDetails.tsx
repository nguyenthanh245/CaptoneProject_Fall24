import { useState } from "react";
import ImportVulModal from "./ImportVulModal";
import { useQuery } from "@tanstack/react-query";
import { getVulnerabilitiesByProject } from "../../services/soc-manager-api";
import Loading from "../Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../Pagination";
import AssignVulModal from "../Leader/AssignVulModal";
import { useUserStore } from "../../stores/user";
import StatusStyle from "../StatusStyle";

type TProps = {
  id: string;
};

export type TSelectedVulId = {
  vulName: string;
  severity: string;
};

export default function VulTableProjectDetails({ id }: TProps) {
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);
  const [isShowImportModal, setIsShowImportModal] = useState(false);
  const [isShowAssignVulModal, setIsShowAssignVulModal] = useState(false);
  const [selectedVulId, setSelectedVulId] = useState<number>();
  const [selectedVulInfo, setSelectedVulInfo] = useState<TSelectedVulId>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const user = useUserStore((state) => state.user);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "fetchVulByProject",
      id,
      debouncedSearchString,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const response = await getVulnerabilitiesByProject({
        projectId: Number(id),
        searchString,
        currentPage,
        pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });

  return (
    <div>
      <div className="flex items-center justify-end flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white gap-2">
        {user?.role == "SOCMANAGER" && (
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-2 rounded-lg shadow-md flex items-center transition duration-200 ease-in-out"
            onClick={() => setIsShowImportModal(true)}
          >
            <svg
              className="w-5 h-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 16l4-4h-3V4h-2v8H8l4 4zm-7 4v-2h14v2H5z" />
            </svg>
            <span>Import Vul</span>
          </button>
        )}
        <div className="relative">
          <button
            id="dropdownActionButton"
            onClick={() => setIsShowFilterDropdown(!isShowFilterDropdown)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2"
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
              isShowFilterDropdown ? "" : "hidden"
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
            placeholder="Search vul by name"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Vulnerable name
            </th>
            <th scope="col" className="px-6 py-3">
              Severity
            </th>
            <th scope="col" className="px-6 py-3">
              Detected Date
            </th>
            <th scope="col" className="px-6 py-3">
              Last Updated
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            {user?.role == "LEADER" && (
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            )}
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
          {error && <div>Error loading project details</div>}
          {data?.data ? (
            data.data.vulnerabilities.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{item?.id}</td>
                <td className="px-6 py-4">{item?.description}</td>
                <td className="px-6 py-4">{item?.severity}</td>
                <td className="px-6 py-4">
                  {new Date(item.firstDetectedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {new Date(item.lastUpdatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  {item?.assignedAt
                    ? new Date(item.assignedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "N/A"}
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
                {user?.role == "LEADER" && (
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 text-white rounded-lg shadow-md ${
                        item.assignedAt
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                      }`}
                      onClick={() => {
                        setSelectedVulInfo({
                          vulName: item.description,
                          severity: item.severity,
                        });
                        setIsShowAssignVulModal(true);
                        setSelectedVulId(item.id);
                      }}
                      disabled={!!item.assignedAt}
                    >
                      Assign
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <div>No vulnerabilities available</div>
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
            {data?.data.vulnerabilities.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalVulnerabilities}
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
      {isShowImportModal && (
        <ImportVulModal
          setIsShowImportModal={setIsShowImportModal}
          id={id}
          refetch={refetch}
        />
      )}
      {isShowAssignVulModal && selectedVulId && selectedVulInfo && (
        <AssignVulModal
          setIsShowAssignVulModal={setIsShowAssignVulModal}
          selectedVulId={selectedVulId}
          selectedVulInfo={selectedVulInfo}
          refetch={refetch}
        />
      )}
    </div>
  );
}
