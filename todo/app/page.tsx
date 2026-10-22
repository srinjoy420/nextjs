"use client";

import { useEffect, useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load saved todos once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) setTodos(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  // Save whenever todos change (after the initial load)
  useEffect(() => {
    if (loaded) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, loaded]);

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos([...todos, { id: Date.now(), text: value, done: false }]);
    setText("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-semibold">Todo list</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {remaining} of {todos.length} left
      </p>

      <form onSubmit={addTodo} className="mt-6 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          className="flex-1 rounded-md border border-neutral-300 bg-transparent px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 dark:border-neutral-700"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 py-3">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className="h-4 w-4 accent-blue-600"
              aria-label={`Mark "${todo.text}" as done`}
            />
            <span
              className={`flex-1 ${
                todo.done ? "text-neutral-400 line-through" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-sm text-neutral-500 hover:text-red-600"
              aria-label={`Delete "${todo.text}"`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {loaded && todos.length === 0 && (
        <p className="mt-6 text-neutral-500">No tasks yet. Add one above.</p>
      )}
    </main>
  );
}