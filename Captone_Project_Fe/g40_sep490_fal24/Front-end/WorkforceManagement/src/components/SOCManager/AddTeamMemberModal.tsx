import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  addPentesterToTeam,
  getPentestersWiththoutTeam,
} from "../../services/soc-manager-api";
import LoadingInButton from "../LoadingInButton";
import { toast } from "sonner";

type TProps = {
  setIsShowAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTeamId: number | undefined;
  refetch: () => void;
};

export default function AddTeamMemberModal({
  setIsShowAddMemberModal,
  selectedTeamId,
  refetch,
}: TProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["fetchMembersWithoutTeam"],
    queryFn: async () => {
      const response = await getPentestersWiththoutTeam();
      return response;
    },
  });

  async function handleAddNewMember() {
    try {
      if (selectedTeamId && selectedMemberId) {
        setIsLoading(true);
        await addPentesterToTeam({
          teamId: selectedTeamId,
          pentesterId: selectedMemberId,
        });
        setIsLoading(false);
        setIsShowAddMemberModal(false);
        refetch();
        toast.success("Add new member success!");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-60">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Member
        </h3>
        {/* Dropdown chọn thành viên */}
        <select
          value={selectedMemberId ?? ""}
          onChange={(e) => setSelectedMemberId(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="" disabled>
            Select a member
          </option>
          {data?.data ? (
            data?.data.map((member) => (
              <option key={member.id} value={member.id}>
                {member.fullName} - {member.email}
              </option>
            ))
          ) : (
            <div>No available pentester</div>
          )}
        </select>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
            onClick={() => {
              setIsShowAddMemberModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 min-w-[57.5px] min-h-[37px] text-white rounded-md shadow-md transition ease-in-out duration-200 ${
              selectedMemberId || isLoading
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAddNewMember}
          >
            {isLoading ? <LoadingInButton /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
