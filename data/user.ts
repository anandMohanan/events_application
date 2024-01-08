import { db } from "@/db"
import { users } from "@/db/schema/user"
import { eq } from "drizzle-orm"

export const GetUserByEmail = async (email: string) => {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return existingUser;
}
