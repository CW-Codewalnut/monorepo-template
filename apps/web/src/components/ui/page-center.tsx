import { cn } from "~/lib/utils";

type PageCenterProps = React.ComponentProps<"div">;

export function PageCenter({ className, ...props }: PageCenterProps) {
	return (
		<main
			className={cn("grid h-svh place-items-center", className)}
			{...props}
		/>
	);
}
