// Overview.jsx
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import PieChart from "@/components/PieChart";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Overview() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  // Sample data for line chart (task trends)
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [2, 3, 5, 4, 6, 7, completed],
        borderColor: "#7e22ce",
        backgroundColor: "rgba(126,34,206,0.2)",
        tension: 0.3,
      },
      {
        label: "Tasks Pending",
        data: [3, 2, 1, 2, 1, 0, pending],
        borderColor: "#d946ef",
        backgroundColor: "rgba(217,70,239,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Overview</h1>

        {/* Stats Cards - single line, small height */}
        <div className="flex flex-wrap gap-4 mb-6">
          <StatsCard title="Total Tasks" value={total} color="purple" />
          <StatsCard title="Completed" value={completed} color="green" />
          <StatsCard title="Pending" value={pending} color="yellow" />
        </div>

        {/* Pie chart + line chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-gray-500 mb-2 font-semibold text-center">Task Progress</h4>
            <PieChart completed={completed} pending={pending} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-gray-500 mb-2 font-semibold text-center">Weekly Task Trend</h4>
            <Line data={lineData} />
          </div>
        </div>
      </main>
    </div>
  );
}
