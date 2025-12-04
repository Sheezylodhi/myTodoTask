"use client";
import { motion } from "framer-motion";

export default function DashboardStats({ total, completed, pending }) {
  const stats = [
    { title: "Total Tasks", value: total, color: "bg-blue-500" },
    { title: "Completed", value: completed, color: "bg-green-500" },
    { title: "Pending", value: pending, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((s) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-xl shadow-md text-white ${s.color}`}
        >
          <p className="text-sm">{s.title}</p>
          <p className="text-2xl font-bold">{s.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
