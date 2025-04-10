import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const trpc = useTRPC();
	const { data: session } = authClient.useSession();

	const privateData = useQuery(trpc.privateData.queryOptions());

	return (
		<div>
			<RedirectToSignIn />
			<SignedIn>
				<h1>Dashboard</h1>
				<p>Welcome {session?.user.name}</p>
				<p>privateData: {privateData.data?.message}</p>
			</SignedIn>
		</div>
	);
}
