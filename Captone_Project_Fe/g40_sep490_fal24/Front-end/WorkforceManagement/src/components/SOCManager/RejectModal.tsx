type TProps = {
  title: string;
  content: string;
  setIsShowModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleFunction: (id: number, rejectReason: string) => void;
  selectedId: number;
  setRejectReason: React.Dispatch<React.SetStateAction<string>>;
  rejectReason: string;
};

export default function RejectModal({
  title,
  content,
  setIsShowModalConfirm,
  handleFunction,
  selectedId,
  setRejectReason,
  rejectReason,
}: TProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg transform transition-transform duration-200 scale-95 hover:scale-100">
        {/* Tiêu đề Modal */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Nội dung Modal */}
        <p className="text-base text-gray-600 mb-6">{content}</p>

        {/* Input Field for Reason */}
        <input
          type="text"
          placeholder="Enter reason"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Nút hành động */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
            onClick={() => setIsShowModalConfirm(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg shadow-md text-white ${
              rejectReason.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              handleFunction(selectedId, rejectReason);
              setRejectReason("");
              setIsShowModalConfirm(false);
            }}
            disabled={!rejectReason.trim()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
