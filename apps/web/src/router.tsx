import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import Loader from "./components/loader";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { Providers, trpc, queryClient } from "./providers";

export const createRouter = () => {
	const router = createTanstackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		context: { trpc, queryClient },
		defaultPendingComponent: () => <Loader />,
		defaultNotFoundComponent: () => <div>Not Found</div>,
		// Wrap: ({ children }) => <Providers>{children}</Providers>,
	});

	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
