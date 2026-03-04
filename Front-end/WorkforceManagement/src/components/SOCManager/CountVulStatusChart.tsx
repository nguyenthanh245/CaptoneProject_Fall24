import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { getCountVulByStatus } from '../../services/soc-manager-api';

ChartJS.register(ArcElement, Tooltip, Legend);

const CountVulStatusDoughnutChart: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["fetchAllStatusByVul"],
    queryFn: async () => {
      const response = await getCountVulByStatus();
      return response;
    },
  });

  const chartData = {
    labels: data?.data.map((item) => item.statusName),
    datasets: [
      {
        data: data?.data.map((item) => item.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            return `Số lượng: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Phân bổ trạng thái lỗ hổng</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CountVulStatusDoughnutChart;
