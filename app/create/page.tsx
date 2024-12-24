"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "@/lib/api/tasks";
import TaskForm from "@/components/forms/TaskForm";
import { TaskFormData } from "@/lib/form-validations/taskForm";
import { TASK_COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AppHeader from "@/components/AppHeader";
import { ChevronLeft } from "lucide-react";

export default function CreateTaskPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      setLoading(true);
      await createTask(data);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again later.",
        variant: "destructive",
      });
    }finally{
      setLoading(false);
    }
  };

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
        <TaskForm
          defaultValues={{ title: "", color: TASK_COLORS[0] }}
          onSubmit={handleCreateTask}
          buttonLabel="Add Task"
          isLoading={loading}
        />
      </div>
    </div>
  );
}