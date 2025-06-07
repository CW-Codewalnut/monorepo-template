import { QueryProvider } from "./query";
import { ThemeProvider } from "./theme";
import { Toaster } from "./toaster";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<ThemeProvider defaultTheme="system">
				{children}
				<Toaster richColors />
			</ThemeProvider>
		</QueryProvider>
	);
}
