'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '../lib/mongodb';
import Todo from '../models/Todo';

interface ActionState {
  message: string;
}

interface TodoItem {
  _id: string;
  name: string;
  isDone: boolean;
}

export async function addTodo(prevState: ActionState, formData: FormData): Promise<ActionState> {
  await dbConnect();
  const name = formData.get('name') as string;

  if (!name) {
    return { message: 'Todo name cannot be empty' };
  }

  try {
    await Todo.create({ name });
    revalidatePath('/'); // Revalidate the home page to show new todo
    return { message: 'Todo added successfully!' };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { message: `Failed to add todo: ${errorMessage}` };
  }
}

export async function getTodos(): Promise<TodoItem[]> {
  await dbConnect();
  try {
    const todos = await Todo.find({});
    return JSON.parse(JSON.stringify(todos)) as TodoItem[]; // Serialize Mongoose documents
  } catch (error: unknown) {
    console.error('Failed to fetch todos:', error);
    return [];
  }
}

export async function toggleTodoStatus(id: string, isDone: boolean): Promise<void> {
  await dbConnect();
  try {
    await Todo.findByIdAndUpdate(id, { isDone });
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to toggle todo status:', error);
  }
}

export async function editTodoName(id: string, newName: string): Promise<void> {
  await dbConnect();
  try {
    await Todo.findByIdAndUpdate(id, { name: newName });
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to edit todo name:', error);
  }
}

export async function deleteTodo(id: string): Promise<void> {
  await dbConnect();
  try {
    await Todo.findByIdAndDelete(id);
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Failed to delete todo:', error);
  }
}