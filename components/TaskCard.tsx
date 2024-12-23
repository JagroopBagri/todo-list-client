import React from "react";
import { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
     <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-md">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task)}
          className="w-5 h-5 border-gray-600 rounded-full data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
        <Link href={`/edit/${task.id}`} className="hover:underline">
        <span
          className={`${
            task.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {task.title}
        </span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: task.color }}
        />
        <button
          onClick={() => onDelete(task)}
          className="text-gray-400 hover:text-gray-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;