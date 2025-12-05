// ------------------ Sidebar.jsx (Responsive) ------------------
"use client";
import Link from "next/link";
import { FiHome, FiCheckCircle, FiPlusSquare, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-purple-700 text-white rounded-md shadow-md"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen p-6 flex flex-col justify-between bg-gradient-to-b from-purple-200 via-purple-100 to-purple-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold mb-8 text-purple-800 drop-shadow-md">Task Manager</h2>

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

        <div className="text-sm text-purple-600 mt-6 italic drop-shadow-sm">
          Powered by Task Manager
        </div>
      </aside>
    </>
  );
}
