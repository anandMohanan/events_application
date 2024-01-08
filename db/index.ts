
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as users from "./schema/user";
import * as accounts from "./schema/account";


const Schema = {
    ...users,
    ...accounts
}

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema: Schema });


