type TProps = {
  title: string;
  content: string;
  setIsShowModalConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleFunction: (id: number) => void;
  selectedId: number;
};

export default function ApproveModal({
  title,
  content,
  setIsShowModalConfirm,
  handleFunction,
  selectedId,
}: TProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg transform transition-transform duration-200 scale-95 hover:scale-100">
        {/* Tiêu đề Modal */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Nội dung Modal */}
        <p className="text-base text-gray-600 mb-6">{content}</p>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
            onClick={() => setIsShowModalConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => {
              handleFunction(selectedId);
              setIsShowModalConfirm(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
