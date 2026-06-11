import z from "zod";

export const paginationEschema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    email: z.string().optional(),
    name: z.string().optional(),
    sortBy: z.enum(["id", "name", "email"]).default("id"),
    order: z.enum(["asc", "desc"]).default("asc"),
})