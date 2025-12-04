// StatsCard.jsx
"use client";

export default function StatsCard({ title, value, color }) {
  const bg = color === "green"
    ? "bg-green-100 text-green-700"
    : color === "yellow"
    ? "bg-yellow-100 text-yellow-700"
    : color === "purple"
    ? "bg-purple-100 text-purple-700"
    : "bg-blue-100 text-blue-700";

  return (
    <div className={`flex-1 p-3 rounded-lg shadow-md ${bg} flex flex-col items-center justify-center min-h-[80px]`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}
