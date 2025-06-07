import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const zodURL = z.string().url();
const zodString = z.string().min(1);

export const ENV = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,

	server: {
		APP_PORT: z.coerce.number(),
		APP_URL: zodURL,
		CORS_ORIGIN_1: zodURL,
		DATABASE_URL: zodURL,
		DATABASE_AUTH_TOKEN: zodString,
		GOOGLE_CLIENT_ID: zodString,
		GOOGLE_CLIENT_SECRET: zodString,

		AUTH_SECRET: zodString,
	},
});
