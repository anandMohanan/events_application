import { z } from "zod";

export const register_validator = z.object({
    email: z.string().email({
        message: "email is required"
    }),
    password: z.string().min(8, {
        message: "Password must be atleast 8 characters length"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})
