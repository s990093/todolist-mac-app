"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "./components/TodoCard";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL, commonTasks, Todo } from "./config/constants";
import { Noto_Sans_TC, Montserrat } from "next/font/google";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// 創建 axios 實例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [loading, setLoading] = useState(true);

  // 獲取所有待辦事項
  const fetchTodos = async () => {
    try {
      const { data } = await api.get(API_URL);
      setTodos(data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // 添加新待辦事項
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const { data } = await api.post("", {
          text: newTodo.trim(),
          priority,
          completed: false,
        });
        setTodos([data, ...todos]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
        alert("新增失敗，請稍後再試");
      }
    }
  };

  // 切換待辦事項狀態
  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const { data } = await api.patch(`${id}/`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
      alert("更新失敗，請稍後再試");
    }
  };

  // 刪除待辦事項
  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("刪除失敗，請稍後再試");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            },
          }}
          className={`${montserrat.className} text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}
        >
          <span className={notoSansTC.className}>載入中</span>
          <motion.div
            animate={{
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="flex space-x-1"
          >
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                className="inline-block"
              >
                •
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-purple-400"
      >
        每日待辦事項
      </motion.h1>

      <form onSubmit={addTodo} className="mb-8">
        <div className="flex gap-2">
          <select
            onChange={(e) => setNewTodo(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-gray-100"
          >
            {commonTasks.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新增待辦事項..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-gray-100"
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-gray-100"
          >
            <option value="low">低優先級</option>
            <option value="medium">中優先級</option>
            <option value="high">高優先級</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            新增
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {todos
            .sort((a, b) => {
              const priorityOrder = { high: 3, medium: 2, low: 1 };
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            })
            .map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <TodoCard
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
