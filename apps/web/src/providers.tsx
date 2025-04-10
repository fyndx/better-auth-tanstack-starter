import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { toast } from "sonner";
import type { AppRouter } from "../../server/src/routers";
import { TRPCProvider } from "./utils/trpc";
import { authClient } from "@/lib/auth-client";
import { Link, useRouter } from "@tanstack/react-router";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(error.message, {
				action: {
					label: "retry",
					onClick: () => {
						queryClient.invalidateQueries();
					},
				},
			});
		},
	}),
	defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${import.meta.env.VITE_SERVER_URL}/trpc`,
			fetch(url, options) {
				return fetch(url, {
					...options,
					credentials: "include",
				});
			},
		}),
	],
});

export const trpc = createTRPCOptionsProxy({
	client: trpcClient,
	queryClient: queryClient,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				<AuthQueryProvider>
					<AuthUIProviderTanstack
						authClient={authClient}
						navigate={(href) => router.navigate({ href })}
						replace={(href) => router.navigate({ href, replace: true })}
						Link={({ href, ...props }) => <Link to={href} {...props} />}
						redirectTo="/"
					>
						{children}
					</AuthUIProviderTanstack>
				</AuthQueryProvider>
			</TRPCProvider>
		</QueryClientProvider>
	);
};
