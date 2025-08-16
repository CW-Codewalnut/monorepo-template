import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { PageCenter } from "~/components/ui/page-center";
import { PageSpinner } from "~/components/ui/page-spinner";
import { authClient } from "~/lib/auth";
import { ROUTE_HOME, ROUTE_LOGIN } from "~/lib/constants";

import { AppHeader } from "./app-header";
import { Login } from "./login";

export function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();
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

		if (data && location.pathname === ROUTE_LOGIN) {
			navigate(ROUTE_HOME, {
				replace: true,
			});
		}
	}, [data, isPending, navigate, location.pathname]);

	if (isPending) {
		return <PageSpinner />;
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
				<AppHeader />
				<main className="mx-auto max-w-7xl p-4">
					<Outlet context={data} />
				</main>
			</>
		);
	}
}
