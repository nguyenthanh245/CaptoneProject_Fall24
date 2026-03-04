import { useQuery } from "@tanstack/react-query";
import { getProjectsByLeader } from "../../services/leader-api";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import StatusStyle from "../StatusStyle";

export default function ListProject() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchProjectByLeader"],
    queryFn: async () => {
      const response = await getProjectsByLeader();
      return response;
    },
  });

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800  mb-6 text-center">
        Participated Projects
      </h2>

      {isLoading ? (
        <div className="w-full h-32 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full flex justify-center gap-10">
          {data?.data && data?.data.length > 0 ? (
            data.data.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-200 max-w-[40%]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  {project.description}
                </p>

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex justify-center">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-medium ${
                        project.status === "COMPLETE"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      <StatusStyle statusName={project.status} />
                    </span>
                  </p>
                </div>

                <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                onClick={() => navigate(`/project-details/${project.id}`)}>
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full text-gray-600 font-medium">
              No projects participated in so far.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
