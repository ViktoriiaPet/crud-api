import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "The name is very little"),
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Пароль слишком короткий"),
    role: z.enum(["user", "admin"]).default("user")
});

export const updateUserSchema = z.object({
    name: z.string().min(2, "The name is very little").optional(),
    email: z.string().email("Email is not valid").optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin"]).optional(),
})