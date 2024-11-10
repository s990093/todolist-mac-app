interface TodoProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoCard({ todo, onToggle, onDelete }: TodoProps) {
  const priorityColors = {
    low: "bg-blue-600",
    medium: "bg-yellow-600",
    high: "bg-red-600",
  };

  const priorityText = {
    low: "低",
    medium: "中",
    high: "高",
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-750 transition-colors">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded-md border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-500" : "text-gray-100"
          }`}
        >
          {todo.text}
        </span>
        <span
          className={`${
            priorityColors[todo.priority]
          } px-2 py-1 rounded-full text-xs text-white`}
        >
          {priorityText[todo.priority]}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-500 hover:text-red-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
