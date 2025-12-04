"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ completed, pending }) {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "# of Tasks",
        data: [completed, pending],
        backgroundColor: ["#22c55e", "#facc15"],
        borderColor: ["#16a34a", "#eab308"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
