import { z } from "zod";

export const login_validator = z.object({

    email: z.string().email({
        message: "email is required"
    }),
    password: z.string().min(1, {
        message: "password is required"
    })
});
