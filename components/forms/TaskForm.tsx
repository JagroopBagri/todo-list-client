"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TASK_COLORS } from "@/lib/constants";
import { taskSchema, TaskFormData } from "@/lib/form-validations/taskForm";
import { Plus, Check } from "lucide-react";

interface TaskFormProps {
  defaultValues: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
  buttonLabel: string;
}

export default function TaskForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  buttonLabel,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const selectedColor = watch("color");
  const isEditing = buttonLabel === "Save";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="text-blue-400 mb-2 block">Title</Label>
        <Input
          id="title"
          placeholder="Ex: Brush your teeth"
          className="bg-[#1a1a1a] border-none text-white placeholder:text-gray-500"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label className="text-blue-400 mb-2 block">Color</Label>
        <div className="flex gap-3">
          {TASK_COLORS.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                color === selectedColor
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[#111111]"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setValue("color", color)}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center"
      >
        {isLoading ? "Saving..." : buttonLabel}
        {!isLoading && (
          <>
            {isEditing ? (
              <Check className="w-4 h-4" />
            ) : (
              <div className="ml-2 bg-blue-500 rounded-full p-1">
                <Plus className="w-4 h-4" />
              </div>
            )}
          </>
        )}
      </Button>
    </form>
  );
}
