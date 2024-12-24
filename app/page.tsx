/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "@/lib/api/tasks";
import { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Plus, Loader2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const completedCount = tasks.filter((t) => t.completed).length;

  const sortTasks = (tasks: Task[]): Task[] => {
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      const sortedTasks = sortTasks(data);
      setTasks(sortedTasks);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    // optimistically update the local state
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === task.id ? { ...t, completed: !task.completed } : t
      );
      return sortTasks(updatedTasks);
    });

    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => {
        const updatedTasks = prev.map((t) => (t.id === task.id ? updated : t));
        return sortTasks(updatedTasks);
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    try {
      setIsDeleting(true);
      await deleteTask(deleteTaskId);
      setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
      setDeleteTaskId(null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <AppHeader></AppHeader>

      <Link href="/create" className="block mb-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
          Create Task{" "}
          <div className="ml-2 bg-blue-500 rounded-full p-1">
            <Plus className="w-4 h-4" />
          </div>
        </Button>
      </Link>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <span className="text-blue-400">Tasks</span>
          <span className="ml-2 bg-[#1a1a1a] px-2 py-1 rounded text-gray-400">
            {isLoading ? "-" : tasks.length}
          </span>
        </div>
        <div>
          <span className="text-purple-400">Completed</span>
          <span className="ml-2 bg-[#1a1a1a] px-2 py-1 rounded text-gray-400">
            {isLoading
              ? "-"
              : !completedCount
              ? 0
              : `${completedCount} of ${tasks.length}`}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-2" />
          <p className="text-gray-400">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center mt-16">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            You don't have any tasks registered yet.
          </p>
          <p className="text-gray-500">
            Create tasks and organize your to-do items.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={() => setDeleteTaskId(task.id)}
            />
          ))}
        </ul>
      )}

      <Dialog
        open={deleteTaskId !== null}
        onOpenChange={() => setDeleteTaskId(null)}
      >
        <DialogContent className="bg-[#1a1a1a] text-white max-w-[90%] w-[400px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p className="text-gray-400">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteTaskId(null)}
              className="bg-gray-700 hover:bg-gray-600 text-white"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
