import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
  AiOutlineFileText
} from "react-icons/ai";

export default function StatusStyle({ statusName }: { statusName: string }) {
  // Hàm để lấy icon dựa trên trạng thái
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <AiOutlineLoading3Quarters className="animate-spin" />;
      case "NEW VUL IMPORT":
        return <AiOutlineExclamationCircle />;
      case "Assigned":
        return <AiOutlineCheckCircle />;
      case "done":
        return <AiOutlineCheckCircle />;
      case "Denied":
        return <AiOutlineCloseCircle />;
      case "Completed":
        return <AiOutlineCheckCircle />;
      case "Fail":
        return <AiOutlineCloseCircle />;
      case "Contract":
        return <AiOutlineFileText />;
      default:
        return null;
    }
  };

  // Hàm để lấy style dựa trên trạng thái
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500 flex items-center gap-2";
      case "NEW VUL IMPORT":
        return "text-orange-500 flex items-center gap-2";
      case "Assigned":
        return "text-green-500 flex items-center gap-2";
      case "done":
        return "text-gray-500 line-through flex items-center gap-2";
      case "Denied":
        return "text-red-500 flex items-center gap-2";
      case "Completed":
        return "text-teal-500 flex items-center gap-2";
      case "Fail":
        return "text-red-700 flex items-center gap-2";
      case "Contract":
        return "text-purple-500 flex items-center gap-2";
      default:
        return "text-black flex items-center gap-2";
    }
  };

  // Hàm để rút gọn tên trạng thái
  const getStatusName = (status: string) => {
    switch (status) {
      case "NEW VUL IMPORT":
        return "New";
      case "In Progress":
        return "In Progress";
      case "Assigned":
        return "Assigned";
      case "done":
        return "Done";
      case "Denied":
        return "Denied";
      case "Completed":
        return "Completed";
      case "Fail":
        return "Fail";
      case "Contract":
        return "Contract";
      default:
        return status;
    }
  };

  return (
    <div className={getStatusStyle(statusName)}>
      {getStatusIcon(statusName)}
      <span>{getStatusName(statusName)}</span>
    </div>
  );
}
