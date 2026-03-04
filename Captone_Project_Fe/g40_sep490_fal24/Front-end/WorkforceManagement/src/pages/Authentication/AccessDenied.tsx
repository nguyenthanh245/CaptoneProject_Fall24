import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">
        You do not have permission to access this page.
      </p>
      <a
        className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
        onClick={() => {
          navigate("/get-started");
        }}
      >
        Back to home
      </a>
    </div>
  );
}
