import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadTodos() {
    const res = await axios.get(`${API_BASE}/api/todos`);
    setTodos(res.data);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/todos`, { title: t });
      setTitle("");
      await loadTodos();
    } finally {
      setLoading(false);
    }
  }

  async function toggleDone(todo) {
    await axios.patch(`${API_BASE}/api/todos/${todo._id}`, { done: !todo.done });
    await loadTodos();
  }

  async function renameTodo(todo) {
    const next = prompt("New title:", todo.title);
    if (next === null) return;
    const t = next.trim();
    if (!t) return;

    await axios.patch(`${API_BASE}/api/todos/${todo._id}`, { title: t });
    await loadTodos();
  }

  async function deleteTodo(todo) {
    await axios.delete(`${API_BASE}/api/todos/${todo._id}`);
    await loadTodos();
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Todo CRUD</h1>

      <form onSubmit={addTodo} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 14px" }}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: "none" }}>
        {todos.map((t) => (
          <li
            key={t._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 10,
              border: "1px solid #ddd",
              marginTop: 10
            }}
          >
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t)} />
            <span style={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>
              {t.title}
            </span>
            <button onClick={() => renameTodo(t)}>Edit</button>
            <button onClick={() => deleteTodo(t)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
