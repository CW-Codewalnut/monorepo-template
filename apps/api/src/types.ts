import type { auth } from "./lib/auth";
import type { appRouter } from "./routers";

export type * from "./db/schema/types";

export type Auth = typeof auth;
export type AppRouter = typeof appRouter;
