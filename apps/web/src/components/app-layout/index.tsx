import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { PageCenter } from "~/components/ui/page-center";
import { authClient } from "~/lib/auth";
import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "~/lib/constants";
import { Login } from "./login";

export function AppLayout() {
	const navigate = useNavigate();
	const { isPending, data } = authClient.useSession();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (!data) {
			navigate(ROUTE_LOGIN, {
				replace: true,
			});
		}

		if (data) {
			navigate(ROUTE_DASHBOARD, {
				replace: true,
			});
		}
	}, [isPending, data, navigate]);

	if (isPending) {
		return (
			<PageCenter>
				<LoaderIcon className="animate-spin" />
			</PageCenter>
		);
	}

	if (!data) {
		return (
			<PageCenter>
				<Login />
			</PageCenter>
		);
	}

	if (data) {
		return (
			<>
				<Outlet context={data} />
			</>
		);
	}
}
