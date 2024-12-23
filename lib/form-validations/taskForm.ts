import { z } from "zod";

/**
 * Schema for task creation/editing.
 * Both title and color are required, with validation for title length.
 */
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty.")
    .max(50, "Title cannot exceed 50 characters."),
  color: z.string().min(1, "Color is required."),
});

export type TaskFormData = z.infer<typeof taskSchema>;