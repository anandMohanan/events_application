
"use server"

import { register_validator } from "@/lib/validators/register_validator"
import { z } from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { GetUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof register_validator>) => {
    const validatedFields = register_validator.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }
    const { name, email, password } = validatedFields.data;
    const existingUser = await GetUserByEmail(email);
    console.log("eu", existingUser);
    if (existingUser.length != 0) {

        return { error: "Email already in use" }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //
    await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
    })

    return {
        success: "User Created"
    }
}
