import { useQuery } from "@tanstack/react-query";
import {
  approveRequest,
  getPendingRequest,
  rejectRequest,
} from "../../services/soc-manager-api";
import Loading from "../../components/Loading";
import { useState } from "react";
import { toast } from "sonner";
import ApproveModal from "../../components/SOCManager/ApproveModal";
import RejectModal from "../../components/SOCManager/RejectModal";
import VerifyUrlModal from "../../components/SOCManager/VerifyUrlModal";
import { useDebounce } from "../../hooks/useDebounce";
import { Pagination } from "../../components/Pagination";

export default function PendingTicket() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowVerifyUrlModal, setIsShowVerifyUrlModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>();
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedUrl, setSelectedUrl] = useState<string>();
  const [rejectReason, setRejectReason] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");
  const debouncedSearchString = useDebounce(searchString, 300);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pending-ticket", debouncedSearchString, currentPage, pageSize],
    queryFn: async () => {
      const response = await getPendingRequest({
        searchString,
        currentPage,
        pageSize,
      });
      return response;
    },
    enabled: !!debouncedSearchString || debouncedSearchString === "",
  });

  function handleClickAction(action: string, id: number) {
    setIsShowModalConfirm(true);
    setSelectedAction(action);
    setSelectedId(id);
  }

  async function handleConfirmApprove(id: number) {
    if (id) {
      await approveRequest({ id });
      refetch();
      toast.success("Approve Request Success !");
    }
  }

  async function handleConfirmReject(id: number, rejectReason: string) {
    if (id) {
      await rejectRequest({ id, rejectReason });
      refetch();
      toast.success("Reject Request Success !");
    }
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching data: {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Approval Pending Ticket
          </h1>
          <svg
            className="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
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
            placeholder="Search pending ticket by name"
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
              Email Submit
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name Suggest
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              URL
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
          {data?.data ? (
            data.data.requests
              .sort((a, b) => b.id - a.id)
              .map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <span className="cursor-default">
                        {item.customerEmail}
                      </span>
                      <div className="absolute bottom-full mb-2 hidden w-max p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg group-hover:block">
                        <p>
                          Tax Code: {item.customerTaxCode || "Not available"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 ">{item.projectName}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{item.description}</td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    <a
                      className="text-blue-500"
                      href={item.urls}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.urls}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        onClick={() => handleClickAction("approve", item.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        onClick={() => handleClickAction("reject", item.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onClick={() => {
                          setIsShowVerifyUrlModal(true);
                          setSelectedId(item.id);
                          setSelectedUrl(item.urls);
                        }}
                      >
                        Verify URL
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

      {/* Modal approve*/}
      {isShowModalConfirm && selectedAction === "approve" && selectedId && (
        <ApproveModal
          title={"Confirm Approval"}
          content={"Are you sure you want to approve this request?"}
          setIsShowModalConfirm={setIsShowModalConfirm}
          handleFunction={handleConfirmApprove}
          selectedId={selectedId}
        />
      )}

      {/* Modal reject*/}
      {isShowModalConfirm && selectedAction === "reject" && selectedId && (
        <RejectModal
          title={"Reject Approval"}
          content={"Please write reason why you reject this request"}
          setIsShowModalConfirm={setIsShowModalConfirm}
          handleFunction={handleConfirmReject}
          selectedId={selectedId}
          setRejectReason={setRejectReason}
          rejectReason={rejectReason}
        />
      )}

      {/* Modal reject*/}
      {isShowVerifyUrlModal && selectedId && selectedUrl && (
        <VerifyUrlModal
          setIsShowVerifyUrlModal={setIsShowVerifyUrlModal}
          selectedId={selectedId}
          selectedUrl={selectedUrl}
        />
      )}
    </div>
  );
}
