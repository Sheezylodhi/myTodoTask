"use client";
import Link from "next/link";
import { FiHome, FiCheckCircle, FiPlusSquare } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-purple-200 via-purple-100 to-purple-50 min-h-screen p-6 flex flex-col justify-between shadow-xl">
      {/* Logo / Dashboard Title */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-purple-800 drop-shadow-md">Task Manager</h2>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-purple-600 hover:text-white font-medium transition duration-300"
          >
            <FiHome size={20} /> Overview
          </Link>

          <Link
            href="/completed"
            className="flex items-center gap-3 text-purple-600 hover:text-white font-medium transition duration-300"
          >
            <FiCheckCircle size={20} /> Completed Tasks
          </Link>

          <Link
            href="/tasks"
            className="flex items-center gap-3 text-purple-600 hover:text-white font-medium transition duration-300"
          >
            <FiPlusSquare size={20} /> Add Tasks
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-sm text-purple-600 mt-6 italic drop-shadow-sm">
        Powered by Task Manager
      </div>
    </aside>
  );
}
