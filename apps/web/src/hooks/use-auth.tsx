import { useOutletContext } from "react-router";

import type { Session } from "~/lib/auth";

export function useAuth() {
	return useOutletContext() as Session;
}
