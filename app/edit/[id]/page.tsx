"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTaskById, updateTask } from "@/lib/api/tasks";
import TaskForm from "@/components/forms/TaskForm";
import { TaskFormData } from "@/lib/form-validations/taskForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id && !Array.isArray(params.id) ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<TaskFormData | null>(null);

  useEffect(() => {
    async function fetchTask(taskId: number | null) {
      if (!taskId) {
        console.error("Invalid task ID");
        router.push("/");
        return;
      }

      try {
        const task = await getTaskById(taskId);
        setInitialValues({ title: task.title, color: task.color });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to load task.",
          variant: "destructive",
        });
        router.push("/");
      }
    }

    fetchTask(taskId);
  }, [taskId, router]);

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!taskId) return;

    try {
      setLoading(true);
      await updateTask(taskId, data);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again later.",
        variant: "destructive",
      });
    }finally{
      setLoading(false);
    }
  };

  if (!initialValues) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader />
      <div className="max-w-lg mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="mb-6 text-gray-400 hover:text-white pl-0"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {initialValues && (
          <TaskForm
            defaultValues={initialValues}
            onSubmit={handleUpdateTask}
            buttonLabel="Save"
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
}