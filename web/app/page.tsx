"use client";

import { useState } from "react";
import TodoCard from "./components/TodoCard";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  // 添加預設任務列表
  const commonTasks = [
    "選擇常見任務...",
    "-作業",
    "英文作業",
    "數學筆記",
    "補習班筆記",
    "閱讀課外書",
    "背單字",
  ];

  // 處理預設任務選擇
  const handleCommonTaskSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTask = e.target.value;
    if (selectedTask !== "選擇常見任務...") {
      setNewTodo(selectedTask);
    }
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodos = [
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          priority: priority,
        },
      ];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

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
            onChange={handleCommonTaskSelect}
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
