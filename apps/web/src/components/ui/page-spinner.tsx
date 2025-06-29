import { LoaderIcon } from "lucide-react";

import { PageCenter } from "~/components/ui/page-center";

export function PageSpinner() {
	return (
		<PageCenter>
			<LoaderIcon className="animate-spin" />
		</PageCenter>
	);
}
