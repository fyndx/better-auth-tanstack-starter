import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/auth/$pathname")({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = Route.useParams();

	return (
		<main className="flex grow flex-col items-center justify-center gap-4 p-4">
			<AuthCard pathname={pathname} />
		</main>
	);
}
