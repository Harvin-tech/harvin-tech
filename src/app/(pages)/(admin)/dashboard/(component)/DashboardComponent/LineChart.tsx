'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export const LineChart: React.FC<{ height?: number }> = ({ height = 400 }) => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "This year",
        data: [0, 0, 0, 1, 0, 0, 0], // Mock data
        borderColor: "rgb(59, 130, 246)", // Tailwind blue
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: height }}>
      <Line data={data} options={options} />
    </div>
  );
};
