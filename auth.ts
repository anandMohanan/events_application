import NextAuth from "next-auth"
import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { GetUserByEmail } from "./data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        // async signIn({ user }) {
        //     const existingUser = await GetUserByEmail(user.email!);
        //     if (!existingUser || !existingUser[0].emailVerified) return false;
        //     return true;
        // },
        async session({ session }) {
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})
