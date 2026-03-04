import { useQuery } from "@tanstack/react-query";
import PersonIcon from "../../assets/images/icons8-person-50.png";
import { getTeamMembers } from "../../services/soc-manager-api";
import { useState } from "react";
import AddTeamMemberModal from "./AddTeamMemberModal";
import Loading from "../Loading";

type TProps = {
  setIsShowTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTeamId: number | undefined;
};

export default function TeamManagementModal({
  setIsShowTeamModal,
  selectedTeamId,
}: TProps) {
  const [isShowAddMemberModal, setIsShowAddMemberModal] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchMember", selectedTeamId],
    queryFn: async () => {
      if (selectedTeamId) {
        const response = await getTeamMembers({ teamId: selectedTeamId });
        return response;
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-xl p-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Team Members Management
        </h2>
        <button
          onClick={() => setIsShowTeamModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto">
            {/* Leader card hiển thị ở hàng đầu */}
            {data?.data.leader && (
              <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col items-center text-center relative border border-blue-200">
                {data.data.leader.imageProfile ? (
                  <img
                    src={`http://localhost:5173${data.data.leader.imageProfile}`}
                    className="rounded-full w-24 h-24 shadow-md object-cover"
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="w-24 h-24 rounded-full mb-4 bg-slate-300 overflow-hidden"
                    src={PersonIcon}
                    alt={`${data.data.leader.fullName} avatar`}
                  />
                )}

                <h3 className="text-lg font-semibold text-blue-700">
                  {data.data.leader.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {data.data.leader.email}
                </p>
                <span className="mt-2 inline-block bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                  Leader
                </span>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {data?.data.members.map((member) => (
              <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center text-center relative border border-gray-200">
                {member.imageProfile ? (
                  <img
                    src={`http://localhost:5173${member.imageProfile}`}
                    className="rounded-full w-24 h-24 shadow-md object-cover"
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="w-24 h-24 rounded-full mb-4 bg-slate-300 overflow-hidden"
                    src={PersonIcon}
                    alt={`${member.fullName} avatar`}
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-700">
                  {member.fullName}
                </h3>
                <p className="text-sm text-gray-500">{member.email}</p>
                <span className="mt-2 inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Pentester
                </span>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Nút "Add" và "Close" bên dưới bên phải */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none"
            onClick={() => setIsShowAddMemberModal(true)}
          >
            Add New Member
          </button>
          <button
            onClick={() => {
              setIsShowTeamModal(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Close
          </button>
        </div>
        {isShowAddMemberModal && (
          <AddTeamMemberModal
            setIsShowAddMemberModal={setIsShowAddMemberModal}
            selectedTeamId={selectedTeamId}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
}
