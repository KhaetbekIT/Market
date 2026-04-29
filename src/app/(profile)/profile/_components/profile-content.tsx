"use client";

import { Heart, LogOut, Package, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/configs/router.config";
import { useStore } from "@/contexts/store-context";

export const ProfileContent = () => {
	const router = useRouter();
	const { user, logout, orders, favorites } = useStore();

	useEffect(() => {
		if (!user) {
			router.push(ROUTERS.LOGIN);
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	const menuItems = [
		{
			icon: Package,
			label: "Мои заказы",
			href: ROUTERS.ORDERS,
			count: orders.length,
		},
		{
			icon: Heart,
			label: "Избранное",
			href: ROUTERS.FAVORITES,
			count: favorites.length,
		},
		{
			icon: Settings,
			label: "Настройки",
			href: ROUTERS.SETTINGS,
		},
	];

	const handleLogout = () => {
		logout();
		router.push(ROUTERS.MAIN);
	};

	return (
		<div className="container mx-auto px-4 py-6">
			{/* Breadcrumb */}
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href={ROUTERS.MAIN}>
							Главная
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Профиль</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="font-serif text-3xl font-bold mb-8">
				Личный кабинет
			</h1>

			<div className="grid md:grid-cols-3 gap-6">
				{/* User info */}
				<div className="md:col-span-1">
					<div className="bg-card rounded-lg border border-border p-6">
						<div className="flex items-center gap-4 mb-6">
							<div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
								<User className="h-8 w-8 text-muted-foreground" />
							</div>
							<div>
								<h2 className="font-medium text-lg">
									{user.name}
								</h2>
								<p className="text-sm text-muted-foreground">
									{user.email}
								</p>
							</div>
						</div>

						<Button
							variant="outline"
							className="w-full bg-transparent"
							onClick={handleLogout}
						>
							<LogOut className="h-4 w-4 mr-2" />
							Выйти
						</Button>
					</div>
				</div>

				{/* Menu */}
				<div className="md:col-span-2">
					<div className="grid sm:grid-cols-2 gap-4">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors group"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
											<item.icon className="h-6 w-6" />
										</div>
										<div>
											<h3 className="font-medium">
												{item.label}
											</h3>
											{item.count !== undefined && (
												<p className="text-sm text-muted-foreground">
													{item.count}{" "}
													{item.count === 1
														? "элемент"
														: "элементов"}
												</p>
											)}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>

					{/* Recent orders */}
					{orders.length > 0 && (
						<div className="mt-6">
							<h3 className="font-medium mb-4">
								Последние заказы
							</h3>
							<div className="bg-card rounded-lg border border-border divide-y divide-border">
								{orders.slice(0, 3).map((order) => (
									<div
										key={order.id}
										className="p-4 flex items-center justify-between"
									>
										<div>
											<p className="font-mono text-sm">
												#{order.id}
											</p>
											<p className="text-sm text-muted-foreground">
												{new Date(
													order.createdAt,
												).toLocaleDateString("ru-RU")}
											</p>
										</div>
										<div className="text-right">
											<p className="font-medium">
												{new Intl.NumberFormat(
													"ru-RU",
													{
														style: "currency",
														currency: "RUB",
														maximumFractionDigits: 0,
													},
												).format(order.total)}
											</p>
											<p className="text-sm text-muted-foreground capitalize">
												{order.status === "pending" &&
													"В обработке"}
												{order.status ===
													"processing" && "Готовится"}
												{order.status === "shipped" &&
													"Отправлен"}
												{order.status === "delivered" &&
													"Доставлен"}
												{order.status === "cancelled" &&
													"Отменён"}
											</p>
										</div>
									</div>
								))}
							</div>
							{orders.length > 3 && (
								<Link
									href={ROUTERS.ORDERS}
									className="block text-center text-sm text-muted-foreground hover:text-foreground mt-3"
								>
									Показать все заказы
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
