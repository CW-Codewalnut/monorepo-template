import "./app.css";

// @ts-expect-error @fontsource-variable is not typed
import "@fontsource-variable/geist";

import type { MetaDescriptor } from "react-router";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { AppLayout } from "~/components/app-layout";
import { AppProviders } from "~/components/providers";

export function meta() {
	return [
		{ title: "Monorepo Template" },
		{ name: "description", content: "Monorepo Template" },
	] satisfies MetaDescriptor[];
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<AppProviders>
			<AppLayout />
		</AppProviders>
	);
}
