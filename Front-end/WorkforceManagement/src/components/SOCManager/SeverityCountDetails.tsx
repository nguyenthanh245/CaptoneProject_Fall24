import { useQuery } from "@tanstack/react-query";
import DangerIcon from "../../assets/images/icons8-danger-48.png";
import { countSeverityByProject } from "../../services/soc-manager-api";

type TProps = {
  id: string | undefined;
};

export default function SeverityCountDetails({ id }: TProps) {
  const { data } = useQuery({
    queryKey: ["fetchCountSeverityAllProject"],
    queryFn: async () => {
      const response = await countSeverityByProject({ projectId: Number(id) });
      return response;
    },
  });

  const severityColor = {
    High: "bg-red-500",
    Medium: "bg-orange-500",
    Low: "bg-yellow-400",
    Informational: "bg-green-400",
  };

  // Add Critical with count 0 if not present
  const defaultData = [
    { severity: "High", count: 0 },
    { severity: "Medium", count: 0 },
    { severity: "Low", count: 0 },
    { severity: "Informational", count: 0 },
  ];

  const mergedData = defaultData.map((defaultItem) => {
    const foundItem = data?.data.find(
      (item) => item.severity === defaultItem.severity
    );
    return foundItem || defaultItem;
  });
  

  return (
    <div className="grid grid-cols-4 space-x-2">
      {/* {isLoading && <Loading />} */}
      {mergedData.map((item, index) => (
        <div
          key={index}
          className={`border p-4 text-xl rounded-md  ${
            item.severity === "High" && severityColor.High
          } ${item.severity === "Medium" && severityColor.Medium} ${
            item.severity === "Low" && severityColor.Low
          } ${item.severity === "Informational" && severityColor.Informational}
           text-white space-y-6 col-span-1`}
        >
          <div className="flex items-center justify-between">
            <div className="text-left">{item.severity}</div>
            {item.severity === "High" && (
              <img src={DangerIcon} alt="Danger icon" className="w-6 h-6" />
            )}
          </div>
          <div className="text-right text-5xl font-semibold">{item.count}</div>
        </div>
      ))}
    </div>
  );
}
