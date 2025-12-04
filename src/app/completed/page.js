"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TaskTable from "@/components/TaskTable";
import EditModal from "@/components/EditModal";

export default function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
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

  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-purple-600">Completed Tasks</h1>

        <TaskTable
          tasks={completedTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          onEdit={setEditingTask}
        />

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
