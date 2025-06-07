import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { ENV } from "./lib/env";
import { appRouter } from "./routers";

const app = new Hono();

app.use(logger());

app.use(
	"*",
	cors({
		credentials: true,
		origin: [ENV.CORS_ORIGIN_1],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	}),
);

app.on(["GET", "POST"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext(_opts, context) {
			return createContext({ context });
		},
	}),
);

const serveConfig = {
	port: ENV.APP_PORT,
	fetch: app.fetch,
} satisfies Bun.Serve;

export default serveConfig;
