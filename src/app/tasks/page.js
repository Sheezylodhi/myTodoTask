"use client";
import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import TaskTable from "@/components/TaskTable";
import EditModal from "@/components/EditModal";
import Pagination from "@/components/Pagination";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [newTask, setNewTask] = useState("");
  const perPage = 10;

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    const created = await res.json();
    setTasks((prev) => [created, ...prev]);
    setNewTask("");
    setPage(1);
  };

  const toggleComplete = async (id, completed) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const updateTaskTitle = async (id, title) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title }),
    });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    setEditingTask(null);
  };

  const filtered = useMemo(() => {
    if (!query) return tasks;
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [tasks, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 w-full overflow-x-hidden">

        {/* Heading fix (not behind sidebar icon) */}
        <h1 className="text-3xl font-bold mb-6 text-purple-600 md:ml-0 ml-14">
          Tasks
        </h1>

        {/* Add & Search */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 w-full">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={addTask}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add Task
          </button>

          <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Task Table (fixed — always horizontal scroll only) */}
        <div className="overflow-x-auto w-full">
          <TaskTable
            tasks={paginated}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            onEdit={setEditingTask}
          />
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center mt-4">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>

        {editingTask && (
          <EditModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={updateTaskTitle}
          />
        )}
      </main>
    </div>
  );
}
