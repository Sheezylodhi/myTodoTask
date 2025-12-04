"use client";
import { motion } from "framer-motion";
import { FiTrash2, FiEdit } from "react-icons/fi";

export default function TaskCard({ task, toggleComplete, deleteTask, onEdit }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "#f0f0f0" }}
      transition={{ duration: 0.2 }}
    >
      <td className="p-3 border-b border-gray-200">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id, !task.completed)}
          className="w-5 h-5 accent-blue-600"
        />
      </td>
      <td className={`p-3 border-b border-gray-200 ${task.completed ? "line-through text-gray-400" : ""}`}>
        {task.title}
      </td>
      <td className="p-3 border-b border-gray-200">{new Date(task.createdAt).toLocaleString()}</td>
      <td className="p-3 border-b border-gray-200 flex gap-2">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
          <FiEdit />
        </button>
        <button onClick={() => deleteTask(task._id)} className="text-red-600 hover:text-red-800">
          <FiTrash2 />
        </button>
      </td>
    </motion.tr>
  );
}
