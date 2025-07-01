"use client";

import { useActionState, useOptimistic, useEffect, useState } from "react";
import {
  addTodo,
  toggleTodoStatus,
  editTodoName,
  deleteTodo,
} from "../app/actions";
import Toast from "./Toast";
import SubmitButton from "./SubmitButton";

interface Todo {
  _id: string;
  name: string;
  isDone: boolean;
  optimistic?: boolean;
}

interface TodoListClientProps {
  initialTodos: Todo[];
}

export default function TodoListClient({ initialTodos }: TodoListClientProps) {
  const [state, formAction] = useActionState(addTodo, { message: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
    initialTodos,
    (currentTodos: Todo[], newTodoName: string) => [
      ...currentTodos,
      {
        _id: "optimistic-" + Date.now(),
        name: newTodoName,
        isDone: false,
        optimistic: true,
      },
    ]
  );

  // This useEffect is no longer needed for initial fetch, but can be used for other side effects if needed
  useEffect(() => {
    if (state?.message) {
      setToastMessage(state.message);
    }
  }, [state]);

  const handleToggle = async (id: string, isDone: boolean) => {
    await toggleTodoStatus(id, !isDone);
  };

  const handleEditClick = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = async (id: string) => {
    await editTodoName(id, editingName);
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (name) {
      addOptimisticTodo(name);
    }
    await formAction(formData);
  };

  return (
    <>
      <form action={handleFormAction}>
        <input type="text" name="name" placeholder="Add a new todo" />
        <SubmitButton />
      </form>

      <ul>
        {optimisticTodos.map((todo: Todo) => (
          <li key={todo._id} style={{ opacity: todo.optimistic ? 0.5 : 1 }}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                <button onClick={() => handleCancelEdit()}>Cancel</button>
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
    </>
  );
}
