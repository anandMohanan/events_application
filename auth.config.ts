import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { login_validator } from "./lib/validators/login_validator";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { users } from "./db/schema/user";
import { GetUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";
export default {
    providers: [Credentials({
        async authorize(credentials) {
            const validatedFields = login_validator.safeParse(credentials);

            if (validatedFields.success) {
                const { email, password } = validatedFields.data;

                const existingUser = await GetUserByEmail(email);
                if (!existingUser || !existingUser[0].password) return null;

                const passwordsMatch = await bcryptjs.compare(
                    password,
                    existingUser[0].password,
                );

                if (passwordsMatch) return existingUser[0];
            }

            return null;
        }

    })]
} satisfies NextAuthConfig

