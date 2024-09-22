// components/Card.tsx
import React, { useState } from "react";

interface CardProps {
  day: string;
  task: string;
  isToday: boolean;
}

const Card: React.FC<CardProps> = ({ day, task, isToday }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      className={`w-96 h-auto flex flex-col justify-between items-start p-6 border rounded-lg shadow-lg ${
        isToday ? "bg-blue-500" : "bg-blueGrotto"
      } text-white transition-all transform ${
        isCompleted ? "opacity-50 line-through" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className="text-xl font-bold">{day}</h2>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          className="form-checkbox h-5 w-5 text-green-500 bg-white border-gray-300 rounded focus:ring focus:ring-blue-400 transition ease-in-out duration-150"
        />
      </div>
      <p className="text-gray-200">{task}</p>
    </div>
  );
};

export default Card;
