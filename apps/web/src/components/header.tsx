import { Link } from "@tanstack/react-router";
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/dashboard", label: "Dashboard" },
		{ to: "/todos", label: "Todos" },
	];

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							activeProps={{ className: "font-bold" }}
							activeOptions={{ exact: true }}
						>
							{label}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<UserButton size="full" />
				</div>
			</div>
			<hr />
		</div>
	);
}
