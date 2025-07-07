import type { Context as HonoContext } from "hono";

import { auth } from "./auth";

type CreateContextOptions = {
	context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
	const session = await auth.api.getSession({
		headers: context.req.raw.headers,
	});

	context.set("auth", session);

	return {
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
