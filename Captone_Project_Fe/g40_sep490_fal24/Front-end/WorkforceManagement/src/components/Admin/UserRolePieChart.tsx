import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ Pie
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function UserRolePieChart() {
  // Dữ liệu biểu đồ
  const data = {
    labels: ["Admin", "Customer", "SOC Manager", "Pentester", "Team Lead"], // Các loại người dùng
    datasets: [
      {
        label: "User Roles Distribution", // Tiêu đề dataset
        data: [5, 20, 8, 12, 7], // Dữ liệu: số lượng người dùng của từng vai trò
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Admin
          "rgba(54, 162, 235, 0.2)", // Customer
          "rgba(255, 206, 86, 0.2)", // SOC Manager
          "rgba(75, 192, 192, 0.2)", // Pentester
          "rgba(153, 102, 255, 0.2)", // Team Lead
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1, // Độ dày của viền quanh mỗi phần của biểu đồ
        hoverBorderWidth: 2,
        hoverBorderColor: 'rgba(0, 0, 0, 0.6)',
      },
    ],
  };

  // Các tùy chọn biểu đồ
  const options = {
      responsive: true, // Biểu đồ tự động thay đổi kích thước theo container
      maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Distribution of User Roles", // Tiêu đề của biểu đồ
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Pie data={data} options={options} /> {/* Component Pie */}
    </div>
  )
}
