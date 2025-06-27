"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../lib/mongodb";
import Todo from "../models/Todo";

export async function addTodo(prevState: any, formData: FormData) {
  await dbConnect();
  const name = formData.get("name") as string;

  if (!name) {
    return { message: "Todo name cannot be empty" };
  }

  try {
    await Todo.create({ name });
    revalidatePath("/"); // Revalidate the home page to show new todo
    return { message: "Todo added successfully!" };
  } catch (error: any) {
    return { message: `Failed to add todo: ${error.message}` };
  }
}

export async function getTodos() {
  await dbConnect();
  try {
    const todos = await Todo.find({});
    return JSON.parse(JSON.stringify(todos)); // Serialize Mongoose documents
  } catch (error: any) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

export async function toggleTodoStatus(id: string, isDone: boolean) {
  await dbConnect();
  try {
    await Todo.findByIdAndUpdate(id, { isDone });
    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to toggle todo status:", error);
  }
}

export async function editTodoName(id: string, newName: string) {
  await dbConnect();
  try {
    await Todo.findByIdAndUpdate(id, { name: newName });
    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to edit todo name:", error);
  }
}

export async function deleteTodo(id: string) {
  await dbConnect();
  try {
    await Todo.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error: any) {
    console.error("Failed to delete todo:", error);
  }
}
