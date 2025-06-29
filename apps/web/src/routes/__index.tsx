import { PageCenter } from "~/components/ui/page-center";
import { useAuth } from "~/hooks/use-auth";

export default function HomePage() {
	const auth = useAuth();

	return (
		<PageCenter>
			<pre>{JSON.stringify(auth, null, 2)}</pre>
		</PageCenter>
	);
}
