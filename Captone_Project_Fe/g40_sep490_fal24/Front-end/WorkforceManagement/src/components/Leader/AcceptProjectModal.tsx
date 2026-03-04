import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingInButton from "../LoadingInButton";
import { useEffect } from "react";
import { acceptTask } from "../../services/leader-api";

type TProps = {
  setIsShowAcceptConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectAcceptId: number;
};

export default function AcceptProjectModal({
  setIsShowAcceptConfirmModal,
  projectAcceptId,
}: TProps) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["acceptProject"],
    mutationFn: async () => {
      await acceptTask({ projectId: projectAcceptId });
    },
    onSuccess: () => {
      toast.success("Verify success!");
      setIsShowAcceptConfirmModal(false);
    },
    onError: (error: string) => {
      toast.error(error);
      setIsShowAcceptConfirmModal(false);
    },
  });

  useEffect(() => {}, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Accept Project
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to accept this project? Once accepted, you will
          be responsible for the assigned tasks.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
            onClick={() => {
              setIsShowAcceptConfirmModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            onClick={() => {
              if (!isPending) {
                mutate();
              }
            }}
            disabled={isPending}
          >
            {/* Confirm */}
            {isPending ? <LoadingInButton /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
