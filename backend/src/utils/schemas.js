import z from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password is required and Length must Greater than 8"),
});

export const createBlogSchema = z.object({
  country: z.string().min(1, "Country Name is Required"),
  title: z.string().min(1, "Post Title is Required"),
  content: z.string().min(1, "Content is Required"),
});
