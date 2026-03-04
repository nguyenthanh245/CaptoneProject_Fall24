// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { getAssignedTaskBySM } from "../../services/leader-api";
// import Loading from "../../components/Loading";
import ListProject from "../../components/Leader/ListProject";
import AcceptProjectModal from "../../components/Leader/AcceptProjectModal";

export default function ProjectAssignment() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isShowAcceptConfirmModal, setIsShowAcceptConfirmModal] =
    useState(false);
  const [projectAcceptId, ] = useState<number>();
  // const { data, isLoading } = useQuery({
  //   queryKey: ["fetchAssignedProjectBySM"],
  //   queryFn: async () => {
  //     try {
  //       const response = await getAssignedTaskBySM();
  //       return response;
  //     } catch (error) {
  //       isLoading: false;
  //     }
  //   },
  // });

  return (
    <div className="relative overflow-x-auto sm:rounded-lg cursor-default">
      <div className="flex flex-col space-y-4 p-5 rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Project Assignment
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
            placeholder="Search users by name"
          />
        </div>
      </div>
      {/* <div className="flex justify-center">
        <div className="p-4 mb-6 rounded-lg shadow-sm w-1/2">
          <h2 className="text-xl font-semibold text-gray-800">
            Project Request Assignment
          </h2>
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <Loading />
            </div>
          )}
          {data?.data && data.data.status !== "ACTIVE" ? (
            <div className="mt-4">
              <div className="border p-4 rounded-lg bg-gray-50 shadow-md">
                <h3 className="text-lg font-bold text-gray-900">
                  {data.data.name}
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  {data.data.description}
                </p>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(data.data.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Estimated End Date:</strong>{" "}
                    {new Date(data.data.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Created Date:</strong>{" "}
                    {new Date(data.data.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600">Pending Acceptance</span>
                  </p>
                </div>
                <button
                  className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                  onClick={() => {
                    setProjectAcceptId(data.data.id);
                    setIsShowAcceptConfirmModal(true);
                  }}
                >
                  Accept
                </button>
                <button className="mt-4 ml-2 inline-flex items-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div>Has No Project Assigned</div>
          )}
        </div>
      </div> */}
      {isShowAcceptConfirmModal && projectAcceptId && (
        <AcceptProjectModal
          setIsShowAcceptConfirmModal={setIsShowAcceptConfirmModal}
          projectAcceptId={projectAcceptId}
        />
      )}

      {/* Participated Projects Section */}
      <ListProject />
    </div>
  );
}
