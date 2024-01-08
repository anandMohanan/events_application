"use server"

import { signIn } from "@/auth";
import { login_validator } from "@/lib/validators/login_validator"
import { LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod"


export const login = async (values: z.infer<typeof login_validator>) => {
    const validatedFields = login_validator.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }


    const { email, password } = validatedFields.data;

    console.log(email, password)
    try {
        await signIn("credentials", {
            email, password, redirectTo: LOGIN_REDIRECT
        })
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials"
                    }
                default:
                    return { error: "Something Went Wrong" }

            }
        }
        throw e
    }
}
