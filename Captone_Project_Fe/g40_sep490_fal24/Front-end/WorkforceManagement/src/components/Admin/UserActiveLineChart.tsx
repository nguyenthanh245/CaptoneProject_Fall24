import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho biểu đồ Line
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserActiveLineChart() {
  // Dữ liệu biểu đồ
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Tháng trong năm
    datasets: [
      {
        label: "New User Registrations", // Tiêu đề dataset
        data: [50, 70, 80, 90, 100, 130, 150, 120, 170, 200, 230, 250], // Dữ liệu: số lượng người đăng ký
        borderColor: "rgba(75, 192, 192, 1)", // Màu đường biểu đồ
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền dưới đường biểu đồ
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Màu của điểm dữ liệu
        pointBorderColor: "rgba(75, 192, 192, 1)", // Màu viền của điểm dữ liệu
        fill: true, // Tô màu phía dưới đường
        tension: 0.4, // Độ cong của đường (0 là đường thẳng, giá trị lớn hơn tạo đường cong)
      },
    ],
  };

  // Các tùy chọn biểu đồ
  const options = {
    responsive: true, // Biểu đồ tự động thay đổi kích thước theo container
    maintainAspectRatio: false,
    maintainAspectRation: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly New User Registrations", // Tiêu đề của biểu đồ
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // Tiêu đề cho trục X
        },
      },
      y: {
        beginAtZero: true, // Bắt đầu trục Y từ 0
        title: {
          display: true,
          text: "Number of Users", // Tiêu đề cho trục Y
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "380px" }}>
      <Line data={data} options={options} /> {/* Component Line */}
    </div>
  );
}
