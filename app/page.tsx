import { Suspense } from "react";
import { getTodos } from "./actions";
import TodoListClient from "../components/TodoListClient";
import Tooltip from "../components/Tooltip"; // Import the Tooltip component
import HomePageNotes from "@/components/notes/HomePageNotes";

export default async function HomePage() {
  const initialTodos = await getTodos();

  return (
    <main>
      <h1>Todo List</h1>

      <Suspense fallback={<div>Loading todos...</div>}>
        <TodoListClient initialTodos={initialTodos} />
      </Suspense>
      <Tooltip>
        <HomePageNotes />
      </Tooltip>
    </main>
  );
}
