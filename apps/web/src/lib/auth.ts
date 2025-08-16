import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { Auth as ServerAuthInstance } from "@cw/api";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_API_URL,
	plugins: [inferAdditionalFields<ServerAuthInstance>()],
});

export type Session = typeof authClient.$Infer.Session;
