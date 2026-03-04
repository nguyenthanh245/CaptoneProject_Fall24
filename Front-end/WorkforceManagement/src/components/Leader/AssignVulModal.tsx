import { useQuery } from "@tanstack/react-query";
import {
  assignVulToPentester,
  getTeamMembersAndTasks,
} from "../../services/leader-api";
import { useState } from "react";
import { toast } from "sonner";
import LoadingInButton from "../LoadingInButton";
import { TSelectedVulId } from "../SOCManager/VulTableProjectDetails";

type TProps = {
  setIsShowAssignVulModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVulId: number;
  selectedVulInfo: TSelectedVulId;
  refetch: () => void;
};

export default function AssignVulModal({
  setIsShowAssignVulModal,
  selectedVulId,
  selectedVulInfo,
  refetch
}: TProps) {
  const [assignedLoading, setAssignedLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["fetchTeamMembersAndTasks"],
    queryFn: async () => {
      const response = await getTeamMembersAndTasks();
      return response;
    },
  });

  async function handleAssignVulnerabilities(assignMemberId: number) {
    try {
      setAssignedLoading(true);
      if (assignMemberId && selectedVulId) {
        await assignVulToPentester({
          pentesterId: assignMemberId,
          vulnerabilityIds: [selectedVulId],
        });
        setIsShowAssignVulModal(false);
        refetch();
        toast.success("Vulnerabilities assigned successfully");
      } else {
        toast.error("Pentester ID or vulnerabilities not provided.");
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setAssignedLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl max-h-[85%] bg-white rounded-lg shadow-lg p-6 overflow-y-scroll">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Assign Vulnerability
          </h2>
          <button
            className="text-xl focus:outline-none"
            onClick={() => setIsShowAssignVulModal(false)}
          >
            ✕
          </button>
        </div>
        {selectedVulId && (
          <div className="mb-6 border-b pb-4">
            <p className="text-lg font-semibold text-gray-700">
              Vulnerability:{" "}
              <span className="text-gray-500">{ selectedVulInfo.vulName }</span>
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Severity: <span className="text-gray-500">{ selectedVulInfo.severity }</span>
            </p>
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Team Members
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {data?.data ? (
            data.data.map((member) => (
              <div
                key={member.memberId}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-start mb-3">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg"
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {member.memberName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.memberEmail}
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="text-md font-semibold text-gray-700 mb-2">
                    Current Tasks:
                  </p>
                  <ul className="space-y-2 max-h-[150px] overflow-y-scroll">
                    {member.assignedTasks.length ? (
                      member.assignedTasks.map((task) => (
                        <li
                          key={task.taskId}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                        >
                          <span className="text-gray-800 text-sm">
                            {task.vulnerability.description}
                          </span>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              task.status === "In Progress"
                                ? "bg-blue-500 text-white"
                                : task.status === "Pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            {task.status}
                          </span>
                        </li>
                      ))
                    ) : (
                      <div className="px-6 py-4 text-center text-gray-500">
                        No Task Now
                      </div>
                    )}
                  </ul>
                </div>
                <button
                  className={`mt-4 w-full px-4 py-2  text-white text-sm font-medium rounded-lg shadow ${
                    assignedLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    handleAssignVulnerabilities(member.memberId);
                  }}
                  disabled={assignedLoading}
                >
                  {assignedLoading ? (
                    <LoadingInButton />
                  ) : (
                    `Assign to ${member.memberName.split(" ")[0]}`
                  )}
                </button>
              </div>
            ))
          ) : (
            <div>a</div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            onClick={() => setIsShowAssignVulModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
