import { z } from "zod";

const registerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    phone: z
        .string()
        .length(10, "Phone number must be exactly 10 digits"),

    state: z
        .string()
        .min(2, "State is required"),

    district: z
        .string()
        .min(2, "District is required"),

    role: z
        .string(),

    language: z
        .string()
});

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

export { registerSchema, loginSchema };