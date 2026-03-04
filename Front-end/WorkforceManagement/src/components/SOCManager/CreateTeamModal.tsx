import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  createNewTeam,
  getLeadersWithoutTeam,
  TFormCreateTeam,
} from "../../services/soc-manager-api";
import { toast } from "sonner";
// import PersonIcon from "../../assets/images/icons8-person-50.png";

type TProps = {
    setIsShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void
};

export default function CreateTeamModal({ setIsShowCreateModal, refetch }: TProps) {
  const [createFormData, setCreateFormData] = useState<TFormCreateTeam>({
    teamName: "",
    leaderId: null,
  });
  const { data } = useQuery({
    queryKey: ["fetchLeaderWithoutTeam"],
    queryFn: async () => {
      const response = await getLeadersWithoutTeam();
      return response;
    },
  });

  async function handleClickCreateTeam() {
    try {
        await createNewTeam({ createFormData });
        toast.success("Team đã được tạo thành công !");
        setIsShowCreateModal(false);
        refetch();
    } catch (error) {
      toast.error(error as string);
    }
  }

  const isFormValid = createFormData.teamName && createFormData.leaderId;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={() => {
            setIsShowCreateModal(false);
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Team
        </h2>
        <div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Name
            </label>
            <input
              type="text"
              name="Team Name"
              value={createFormData.teamName}
              onChange={(e) => {
                setCreateFormData((prev) => ({
                  ...prev,
                  teamName: e.target.value,
                }));
              }}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Leader
            </label>
            <select
              value={createFormData.leaderId || ""}
              onChange={(e) => {
                const leaderId = Number(e.target.value);
                setCreateFormData((prev) => ({
                  ...prev,
                  leaderId: leaderId,
                }));
              }}
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
              required
            >
              <option value="" disabled>
                Select a leader
              </option>
              {data?.data &&
                data.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.email}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition ease-in-out duration-200"
              onClick={() => {
                setIsShowCreateModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 py-2 text-white rounded-md shadow-md transition ease-in-out duration-200 ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleClickCreateTeam}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
