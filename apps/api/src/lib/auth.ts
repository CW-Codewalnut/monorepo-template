import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";
import * as schema from "../db/schema";
import { ENV } from "./env";

export const auth = betterAuth({
	baseURL: ENV.APP_URL,
	secret: ENV.AUTH_SECRET,
	trustedOrigins: [ENV.CORS_ORIGIN_1],

	database: drizzleAdapter(db, {
		schema,
		provider: "sqlite",
	}),

	advanced: {
		database: {
			generateId: false,
		},
	},

	emailAndPassword: {
		enabled: false,
	},

	socialProviders: {
		google: {
			clientId: ENV.GOOGLE_CLIENT_ID,
			clientSecret: ENV.GOOGLE_CLIENT_SECRET,
			scope: [
				"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile",
			],
		},
	},
});
