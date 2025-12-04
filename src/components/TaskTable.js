"use client";
import { FiTrash2, FiEdit, FiCheckCircle } from "react-icons/fi";

export default function TaskTable({ tasks, toggleComplete, deleteTask, onEdit }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-purple-100">
      <table className="min-w-full divide-y divide-purple-100 border border-purple-100 rounded-xl">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700 border-b border-purple-200">#</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700 border-b border-purple-200">Title</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700 border-b border-purple-200">Created</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700 border-b border-purple-200">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700 border-b border-purple-200">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-purple-100">
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-gray-400 text-sm border-b border-white">
                No tasks found
              </td>
            </tr>
          )}

          {tasks.map((task, idx) => {
            const isLast = idx === tasks.length - 1;
            return (
              <tr
                key={task._id}
                className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-200 rounded-lg"
              >
                <td className={`px-4 py-3 text-sm text-gray-700 ${isLast ? 'border-b border-white' : ''}`}>{idx + 1}</td>

                <td
                  className={`px-4 py-3 text-sm font-medium ${task.completed ? "line-through text-green-600" : "text-gray-700"} ${isLast ? 'border-b border-white' : ''}`}
                >
                  {task.title}
                </td>

                <td className={`px-4 py-3 text-sm text-gray-500 ${isLast ? 'border-b border-white' : ''}`}>
                  {new Date(task.createdAt).toLocaleString()}
                </td>

                <td className={`px-4 py-3 text-sm ${isLast ? 'border-b border-white' : ''}`}>
                  {task.completed ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className={`px-4 py-3 text-sm flex gap-3 ${isLast ? 'border-b border-white' : ''}`}>
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>

                  {!task.completed && (
                    <button
                      onClick={() => toggleComplete(task._id, true)}
                      className="text-green-600 hover:text-green-800 transition cursor-pointer"
                      title="Mark as Complete"
                    >
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
