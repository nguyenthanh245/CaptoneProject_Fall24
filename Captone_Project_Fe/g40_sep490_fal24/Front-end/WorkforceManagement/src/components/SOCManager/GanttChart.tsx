import { useQuery } from "@tanstack/react-query";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { getProjectWithAssignedVulnerabilities } from "../../services/soc-manager-api";

// Extend Task type to add 'assignee'
interface CustomTask extends Task {
  assignee: string; // Người phụ trách
}

const GanttChart = ({ id }: { id: string | undefined }) => {
  // Fetch project and vulnerabilities
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetchGanttChart", id],
    queryFn: async () => {
      const response = await getProjectWithAssignedVulnerabilities({
        projectId: Number(id),
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div>
        Error fetching data{" "}
        <span
          className="text-blue-300 cursor-pointer"
          onClick={() => {
            refetch();
          }}
        >
          reload now
        </span>
      </div>
    );
  }

  // Xử lý nếu `vulnerabilities` không có dữ liệu
  const vulnerabilities = data?.vulnerabilities || [];
  if (vulnerabilities.length === 0) {
    return <div>No data available for gantt chart</div>;
  }

  // Map vulnerabilities to Gantt tasks
  const tasks: CustomTask[] = vulnerabilities.map((vul: any) => ({
    id: vul.vulnerabilityId.toString(),
    name: vul.description,
    start: new Date(vul.assignedAt), // Ngày bắt đầu là thời điểm assigned
    end: vul.fixedAt ? new Date(vul.fixedAt) : new Date(), // Nếu không có fixedAt, giả định 3 ngày
    progress: vul.fixedAt ? 100 : 50, // Chuyển đổi status thành progress (giả định nếu statusId là 8 thì progress = 50)
    dependencies: [], // Bạn có thể thiết lập nếu có phụ thuộc
    type: "task",
    assignee: vul.assignedToName || "Unassigned", // Hiển thị người được giao hoặc để "Unassigned"
  }));

  // Tooltip Content Customization
  const CustomTooltip = ({ task }: { task: CustomTask }) => {
    return (
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>{task.name}</strong>
        </p>
        <p>
          Time:{" "}
          {new Date(task.start).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(task.end).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p>Progress: {task.progress}%</p>
        <p>Member doing: {task.assignee}</p>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gantt Chart</h2>
      <div style={{ width: "100%", height: "auto" }}>
        <Gantt
          tasks={tasks}
          TooltipContent={(tooltipProps) => {
            const task = tooltipProps.task as CustomTask; // Ép kiểu để truy cập các thuộc tính tùy chỉnh
            return <CustomTooltip task={task} />;
          }}
          TaskListHeader={({
            headerHeight,
            rowWidth,
            fontFamily,
            fontSize,
          }) => (
            <div
              style={{
                height: headerHeight,
                lineHeight: `${headerHeight}px`,
                fontFamily,
                fontSize,
                width: rowWidth,
              }}
            >
              Tên công việc
            </div>
          )}
          TaskListTable={({ tasks, rowHeight }) => (
            <>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    height: rowHeight,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    boxSizing: "border-box",
                  }}
                >
                  <span>{task.name}</span>
                  <span>
                    {new Date(task.start).toLocaleDateString("en-GB")} -{" "}
                    {new Date(task.end).toLocaleDateString("en-GB")}
                  </span>
                </div>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default GanttChart;
