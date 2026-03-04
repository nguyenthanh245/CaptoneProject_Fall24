import { useQuery } from "@tanstack/react-query";
import { getTopProjects } from "../../services/soc-manager-api";
import Loading from "../Loading";

export default function TopProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchTopProjects"],
    queryFn: async () => {
      const response = await getTopProjects();
      return response;
    },
  });
  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">
              #
            </th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">
              Project Name
            </th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">
              Vulnerability
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="py-4 text-center">
                <Loading />
              </td>
            </tr>
          )}
          {data?.data.map((item, index) => (
            <tr className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{item.vulnerabilityCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
