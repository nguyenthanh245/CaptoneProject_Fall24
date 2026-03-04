import { useQuery } from "@tanstack/react-query";
import {
  getMembersByProject,
  TMembersByProjectPentester,
} from "../../services/soc-manager-api";
import { useState } from "react";
import DetailsMemberModal from "./DetailsMemberModal";
// import PersonIcon from "../../assets/images/icons8-person-50.png";

type TProps = {
  id: string | undefined;
};
export default function OrgChartMember({ id }: TProps) {
  const [isShowDetailsMemberModal, setIsShowDetailsMemberModal] =
    useState(false);
  const [selectedMember, setSelectedMember] =
    useState<TMembersByProjectPentester>();
  const { data } = useQuery({
    queryKey: ["fetchTeamMember", id],
    queryFn: async () => {
      const response = await getMembersByProject({ projectId: Number(id) });
      return response;
    },
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-lg container mx-auto w-full h-full border">
      <div className="text-lg font-sans text-center font-semibold">
        Team Members
      </div>
      <div className="relative wrap overflow-hidden p-12 h-auto">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        {/* leader */}
        {data?.data && (
          <div className="mb-8 flex justify-between items-center flex-row-reverse w-full right-timeline relative">
            <div className=" w-5/12"></div>
            <div className="z-20 flex justify-center items-center bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </h1>
            </div>
            <div
              className="relative border-2 rounded-lg shadow-xl w-5/12 px-5 pb-4 pt-5 animate-border hover:scale-105 transition ease-in-out cursor-pointer"
              onClick={() => {
                setSelectedMember(data.data.leader);
                setIsShowDetailsMemberModal(true);
              }}
            >
              <img
                className="absolute w-16 h-16 -top-1/2 rounded-full mb-4 bg-slate-300 overflow-hidden"
                src="https://bumbeishvili.github.io/avatars/avatars/portrait12.png"
                alt="leader"
              />
              <h3 className="mb-2 font-bold text-xl bg-gradient-to-r from-[#a4c6b8] to-[#5e435d] bg-clip-text text-transparent">
                {data.data.leader.fullName.trim() || "Leader Name 1"}
              </h3>
              <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                user@example.com
              </p>
              <div className="absolute top-1/2 -right-14 bg-gray-400 h-[2px] w-14 z-0 overflow-hidden"></div>
            </div>
          </div>
        )}

        {/* pentester */}
        {data?.data &&
          data.data.members.map((item, index) => (
            <div
              className={`mb-8 flex justify-between items-center w-full left-timeline ${
                index % 2 != 0 && "flex-row-reverse"
              }`}
            >
              <div className=" w-5/12"></div>
              <div className="z-20 flex justify-center items-center bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">
                  {index + 1}
                </h1>
              </div>
              <div
                className="text-nowrap relative border border-[#E4E2E9] rounded-lg shadow-xl w-5/12 px-5 pb-4 pt-5 hover:scale-105 transition ease-in-out cursor-pointer"
                onClick={() => {
                  setSelectedMember(item);
                  setIsShowDetailsMemberModal(true);
                }}
              >
                <img
                  className="absolute w-16 h-16 -top-1/2 rounded-full mb-4 bg-slate-300 overflow-hidden"
                  src={`https://bumbeishvili.github.io/avatars/avatars/portrait85.png`}
                />
                <h3 className="mb-2 font-bold text-gray-800 text-xl">
                  {item.fullName || `Pentester Name ${index}`}
                </h3>
                <p className="text-sm leading-snug tracking-wide text-gray-500 text-opacity-100">
                  {item.email}
                </p>
                <div
                  className={`absolute top-1/2 -right-14 ${
                    index % 2 == 0 && "-left-14"
                  } bg-gray-400 h-[2px] w-14 z-0 overflow-hidden`}
                ></div>
              </div>
            </div>
          ))}
      </div>
      {isShowDetailsMemberModal && selectedMember && (
        <DetailsMemberModal
          selectedMember={selectedMember}
          setIsShowDetailsMemberModal={setIsShowDetailsMemberModal}
        />
      )}
    </div>
  );
}
