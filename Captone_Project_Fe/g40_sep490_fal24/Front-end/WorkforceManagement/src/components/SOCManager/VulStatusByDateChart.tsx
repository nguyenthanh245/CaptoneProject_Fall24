import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function VulStatusByDateChart() {
  const data = {
    labels: ["Done", "Assigned", "Fail"],
    datasets: [
      {
        label: "Vulnerability Status",
        data: [30, 50, 20], // Example data
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Done
          "rgba(54, 162, 235, 0.6)", // Assigned
          "rgba(255, 99, 132, 0.6)", // Fail
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4"></h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}
