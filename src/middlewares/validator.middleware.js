import { z } from "zod";
import { cleanString } from "../utils/sanitize.js";

export const userRegisterValidationSchema = z.object({
 name: z
    .string()
    .min(1, "Name is required")
    .transform(cleanString),

email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),


  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({ message: "Role must be user or admin" }),
    }),


});

export const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .toLowerCase()
    .trim(),
    

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
   

});

export const validate = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body); 
    req.body = data; 
    next();
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Validation error",
      errors: error.errors,
    });
  }
};


export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .trim(),

  description: z
    .string()
    .optional(),

  status: z
    .enum(["todo", "inprogress", "completed"])
    .optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .optional(),

  dueDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});


export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "inprogress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
});