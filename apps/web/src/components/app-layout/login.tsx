import { GoogleIcon } from "~/components/icons/google";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth";
import { ROUTE_HOME } from "~/lib/constants";

export function Login() {
	function handleSignIn() {
		authClient.signIn.social({
			provider: "google",
			callbackURL: `${import.meta.env.VITE_APP_URL}${ROUTE_HOME}`,
		});
	}

	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="font-bold text-3xl">Monorepo Template</h1>
			<Button onClick={handleSignIn} size="lg">
				<GoogleIcon />
				Continue with Google
			</Button>
		</section>
	);
}
