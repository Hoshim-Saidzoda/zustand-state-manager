import { create } from "zustand";

const API = "https://689efd573fed484cf878a8e9.mockapi.io/users"; 

const useTodoStore = create((set, get) => ({
  data: [],
  error: null,
  currentUser: null,

  getTodos: async () => {
    try {
      const res = await fetch(API);
      const todos = await res.json();
      set({
        data: todos.map(todo => ({
          ...todo,
          images: Array.isArray(todo.images) ? todo.images : [todo.images].filter(Boolean)
        }))
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Новый метод: получить todo/user по id
  fetchUserById: async (id) => {
    try {
      const res = await fetch(`${API}/${id}`);
      const user = await res.json();
      set({ currentUser: user });
    } catch (err) {
      set({ error: err.message });
    }
  },

  saveTodo: async (todo, modalMode, currentTodo) => {
    try {
      if (modalMode === "add") {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });
      } else {
        await fetch(`${API}/${currentTodo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });
      }
      get().getTodos();
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteTodo: async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      get().getTodos();
    } catch (err) {
      set({ error: err.message });
    }
  },

  toggleComplete: async (todo) => {
    try {
      const updated = { ...todo, status: !todo.status };
      await fetch(`${API}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      get().getTodos();
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useTodoStore;
