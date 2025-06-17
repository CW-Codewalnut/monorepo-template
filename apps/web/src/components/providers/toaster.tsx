import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

import { useTheme } from "./theme";

const Toaster = (props: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner className="toaster group" style={styles} theme={theme} {...props} />
	);
};

const styles = {
	"--normal-bg": "var(--popover)",
	"--normal-text": "var(--popover-foreground)",
	"--normal-border": "var(--border)",
} as React.CSSProperties;

export { Toaster };
