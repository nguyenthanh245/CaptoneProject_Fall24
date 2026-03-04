import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  assignTeamToProject,
  getAllTeamsNotInProject,
} from "../../services/soc-manager-api";
import { toast } from "sonner";
import LoadingInButton from "../LoadingInButton";

type TProps = {
  setIsShowAssignModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProjectId: number | undefined;
  refetch: () => void;
};

export default function AssignModal({
  setIsShowAssignModal,
  selectedProjectId,
  refetch
}: TProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["fetchTeamsNoInProject"],
    queryFn: async () => {
      const response = await getAllTeamsNotInProject();
      return response;
    },
  });

  async function handleAssign() {
    try {
      if (selectedTeamId && selectedProjectId) {
        setIsLoading(true);
        await assignTeamToProject({
          teamId: selectedTeamId,
          selectedProjectId: selectedProjectId,
        });
        setIsLoading(false);
        refetch();
        setIsShowAssignModal(false);
        toast.success("Assigned success !");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error as string);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Assign Project to Team
        </h2>

        {/* List of Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {data?.data ? (
            data?.data.map((item) => (
              <div
                key={item.teamId}
                onClick={() => setSelectedTeamId(item.teamId)}
                className={`p-4 border rounded-lg shadow-sm cursor-pointer transition duration-75 transform hover:shadow-lg ${
                  selectedTeamId === item.teamId
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <h3 className="text-lg font-medium text-blue-700 mb-1">
                  {item.teamName}
                </h3>
                <p className="text-sm text-gray-500 mb-1">ID: {item.teamId}</p>
                <p className="text-sm text-green-600">
                  <strong>Leader:</strong> {item.leaderEmail}
                </p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Specializes in cybersecurity and testing to enhance project
                  security.
                </p>
              </div>
            ))
          ) : (
            <div>No team available.</div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsShowAssignModal(false)}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedTeamId}
            className={`px-4 py-2 text-white rounded-md shadow-md transition ease-in-out duration-200 ${
              selectedTeamId
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? <LoadingInButton /> : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}
