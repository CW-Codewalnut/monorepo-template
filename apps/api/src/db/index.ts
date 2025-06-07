import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { ENV } from "../lib/env";

const client = createClient({
	url: ENV.DATABASE_URL,
	authToken: ENV.DATABASE_AUTH_TOKEN,
});

export const db = drizzle({
	client,
});
