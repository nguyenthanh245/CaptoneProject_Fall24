import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLeaderAssignmentHistory, TAssignmentHistoryData } from "../../services/leader-api";
import Loading from "../../components/Loading";
import StatusStyle from "../../components/StatusStyle";
import TaskDetailsModal from "../../components/TaskDetailsModal";

export default function HistoryAssignedTask() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDataSelected, setTaskDataSelected] = useState<TAssignmentHistoryData>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchAssignmentHistory"],
    queryFn: async () => {
      const response = await getLeaderAssignmentHistory();
      return response;
    },
  });

  const openModal = (taskId: number) => {
    if (data?.data) {
      const taskData = data.data.find((item) => item.task.taskId == taskId);
      setTaskDataSelected(taskData);
    }
    setSelectedTaskId(taskId); // Clear the task ID
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedTaskId(null); // Clear the task ID
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-col space-y-4 p-5  rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800">Assigned Task</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
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
      <table className="w-full text-sm text-left text-gray-500 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-4 py-3">
              Task ID
            </th>
            <th scope="col" className="px-4 py-3">
              Vulnerability ID
            </th>
            <th scope="col" className="px-4 py-3">
              Vulnerability Name
            </th>
            <th scope="col" className="px-4 py-3">
              Assigned To
            </th>
            <th scope="col" className="px-4 py-3">
              Assigned At
            </th>
            <th scope="col" className="px-4 py-3">
              Due Date
            </th>
            <th scope="col" className="px-4 py-3">
              Update At
            </th>
            <th scope="col" className="px-4 py-3">
              Action Reason
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={9}>
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </td>
            </tr>
          )}
          {data?.data ? (
            data.data.map((item) =>
              item.task ? (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{item.task.taskId}</td>
                  <td className="px-4 py-4">{item.task.vulnerabilityId}</td>
                  <td className="px-4 py-4">
                    {item.task.vulnerability.vulnerabilityName}
                  </td>
                  <td className="px-4 py-4">{item.task.assignedToName}</td>
                  <td className="px-4 py-4">
                    {item.task.assignedAt
                      ? new Date(item.task.assignedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(item.task.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    {item.task.assignedAt
                      ? new Date(item.task.assignedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    {item.task.rejectReason || item.task.actionReason || "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    {<StatusStyle statusName={item.task.statusName} />}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className="w-20 px-4 py-2 text-white rounded-lg shadow-md bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 flex justify-center"
                      onClick={() => openModal(item.task.taskId)}
                    >
                      {item.task.isReview ? "Reviewed" : "Review"}
                    </button>
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                No pentest request available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedTaskId && taskDataSelected && (
        <TaskDetailsModal
          isVisible={isModalVisible}
          onClose={closeModal}
          taskId={selectedTaskId}
          taskDataSelected={taskDataSelected}
          refetch={refetch}
        />
      )}
    </div>
  );
}
