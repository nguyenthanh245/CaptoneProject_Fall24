import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  customerRejectRequest,
  getSubmittedTickets,
} from "../../services/customer-api";
import Loading from "../../components/Loading";
import RejectModal from "../../components/Customer/RejectModal";
import { toast } from "sonner";
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";

export default function RequestStatus() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [rejectReason, setRejectReason] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "fetchRequestSent",
      debouncedSearchString,
      currentPage,
      pageSize,
    ],
    queryFn: async () => {
      const response = await getSubmittedTickets({
        searchString,
        currentPage,
        pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });

  function handleClickAction(id: number) {
    setIsShowModalConfirm(true);
    setSelectedId(id);
  }

  async function handleConfirmReject(id: number, rejectReason: string) {
    if (id) {
      await customerRejectRequest({ id, rejectReason });
      refetch();
      toast.success("Reject Request Success !");
    }
  }

  const statusNotAllowRejectButton = ["Approved", "Denied", "In Progress"];

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">
            Submitted Ticket
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M21 10V7a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0013.586 3H10.414a1 1 0 00-.707.293L8.293 4.707A1 1 0 017.586 5H5a2 2 0 00-2 2v3a1 1 0 00-.293.707V14.293c0 .265.105.52.293.707L5 18.414a1 1 0 00.707.293h2.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l1.414-1.414a1 1 0 01.707-.293h2.586a2 2 0 002-2v-3a1 1 0 00.293-.707V10.707A1 1 0 0021 10z"
            />
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
              Project Name Suggest
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              URL
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
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
          {data?.data.requests ? (
            data.data.requests
              .sort((a, b) => b.id - a.id)
              .map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-8">{item.id}</td>
                  <td className="px-6 py-8">{item.projectName}</td>
                  <td className="px-6 py-8 truncate max-w-xs">{item.description}</td>
                  <td className="px-6 py-8 truncate max-w-xs">
                    <a
                      className="text-blue-500"
                      href={item.urls}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.urls}
                    </a>
                  </td>
                  <td className="px-6 py-8 space-x-2">
                    {item.statusName === "Approved" && (
                      <>
                        <CheckCircleOutlined
                          style={{ color: "green", fontSize: "16px" }}
                        />
                        <span style={{ color: "green" }}>Approved</span>
                      </>
                    )}
                    {item.statusName === "In Progress" && (
                      <>
                        <SyncOutlined
                          style={{ color: "blue", fontSize: "16px" }}
                          spin
                        />
                        <span style={{ color: "blue" }}>In Progress</span>
                      </>
                    )}
                    {item.statusName === "Pending" && (
                      <>
                        <ClockCircleOutlined
                          style={{ color: "orange", fontSize: "16px" }}
                        />
                        <span style={{ color: "orange" }}>Pending</span>
                      </>
                    )}
                    {(item.statusName === "Denied" ||
                      item.statusName === "Fail") && (
                      <div className="relative group flex items-center">
                        <CloseCircleOutlined
                          style={{ color: "red", fontSize: "16px" }}
                          className="mr-2"
                        />
                        <span
                          style={{ color: "red" }}
                          className="cursor-default"
                        >
                          Rejected
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 hidden w-max max-w-xs p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                            Reject reason:{" "}
                            {item.rejectReason || "No reason provided"}
                          </div>
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-8">
                    {" "}
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="px-6 py-8">
                    <button
                      className={`px-4 py-2 text-white rounded-lg shadow-md focus:ring-2 focus:outline-none ${
                        statusNotAllowRejectButton.includes(item.statusName)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 focus:ring-red-500"
                      }`}
                      onClick={() => handleClickAction(item.id)}
                      disabled={statusNotAllowRejectButton.includes(
                        item.statusName
                      )}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No pentest request available.
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
            {data?.data.requests.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {data?.data.totalRequests}
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
      {isShowModalConfirm && selectedId && (
        <RejectModal
          title={"Reject Request"}
          content={"Please write reason why you reject this request"}
          setIsShowModalConfirm={setIsShowModalConfirm}
          handleFunction={handleConfirmReject}
          selectedId={selectedId}
          setRejectReason={setRejectReason}
          rejectReason={rejectReason}
        />
      )}
    </div>
  );
}
