import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Task from "@/lib/model/Task";

// GET → fetch all tasks
export async function GET() {
  await connect();
  const tasks = await Task.find().sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

// POST → add new task
export async function POST(req) {
  try {
    await connect();
    const { title } = await req.json();
    const task = new Task({ title });
    await task.save();
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

// PUT → update task (EDIT or TOGGLE COMPLETE)
export async function PUT(req) {
  try {
    await connect();
    const { id, completed, title } = await req.json();

    let update = {};
    if (completed !== undefined) update.completed = completed;
    if (title !== undefined) update.title = title;

    const task = await Task.findByIdAndUpdate(id, update, { new: true });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE → remove task
export async function DELETE(req) {
  try {
    await connect();
    const { id } = await req.json();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
