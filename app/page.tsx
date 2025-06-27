"use client";

import { useActionState } from "react";
import {
  addTodo,
  getTodos,
  toggleTodoStatus,
  editTodoName,
  deleteTodo,
} from "./actions";
import { useEffect, useState, useCallback } from "react";
import Toast from "../components/Toast"; // Import the Toast component

export default function HomePage() {
  const [state, formAction, isPending] = useActionState(addTodo, {
    message: "",
  });
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  const fetchAndSetTodos = useCallback(async () => {
    const fetchedTodos = await getTodos();
    setTodos(fetchedTodos);
  }, []);

  useEffect(() => {
    fetchAndSetTodos();
  }, [state, fetchAndSetTodos]);

  useEffect(() => {
    if (state?.message) {
      setToastMessage(state.message);
    }
  }, [state]);

  const handleToggle = async (id: string, isDone: boolean) => {
    await toggleTodoStatus(id, !isDone);
    fetchAndSetTodos();
  };

  const handleEditClick = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = async (id: string) => {
    await editTodoName(id, editingName);
    setEditingId(null);
    setEditingName("");
    fetchAndSetTodos();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchAndSetTodos();
  };

  return (
    <main>
      <h2>這是首頁</h2>
      <h1>Todo List</h1>

      <form action={formAction}>
        <input type="text" name="name" placeholder="Add a new todo" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => handleToggle(todo._id, todo.isDone)}
                />
                <span
                  style={{
                    textDecoration: todo.isDone ? "line-through" : "none",
                  }}
                >
                  {todo.name}
                </span>
                <button onClick={() => handleEditClick(todo._id, todo.name)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </main>
  );
}
