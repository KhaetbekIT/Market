"use client";

import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
import { cn, formatPrice } from "@/lib/utils";

export const OrdersContent = () => {
	const router = useRouter();
	const { user, orders } = useStore();

	useEffect(() => {
		if (!user) {
			router.push(ROUTERS.LOGIN);
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	const getStatusBadge = (status: string) => {
		const styles: Record<string, string> = {
			pending: "bg-yellow-100 text-yellow-800",
			processing: "bg-blue-100 text-blue-800",
			shipped: "bg-purple-100 text-purple-800",
			delivered: "bg-green-100 text-green-800",
			cancelled: "bg-red-100 text-red-800",
		};
		const labels: Record<string, string> = {
			pending: "В обработке",
			processing: "Готовится",
			shipped: "Отправлен",
			delivered: "Доставлен",
			cancelled: "Отменён",
		};
		return (
			<span
				className={cn(
					"text-xs font-medium px-2 py-1 rounded",
					styles[status],
				)}
			>
				{labels[status]}
			</span>
		);
	};

	return (
		<div className="container mx-auto px-4 py-6">
			{/* Breadcrumb */}
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Главная</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/profile">Профиль</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Заказы</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="font-serif text-3xl font-bold mb-8">Мои заказы</h1>

			{orders.length === 0 ? (
				<div className="text-center py-16">
					<div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
						<Package className="h-12 w-12 text-muted-foreground" />
					</div>
					<h2 className="font-medium text-xl mb-2">
						Заказов пока нет
					</h2>
					<p className="text-muted-foreground mb-6">
						Оформите первый заказ в нашем каталоге
					</p>
					<Button asChild>
						<Link href="/catalog">Перейти в каталог</Link>
					</Button>
				</div>
			) : (
				<Accordion type="multiple" className="space-y-4">
					{orders.map((order) => (
						<AccordionItem
							key={order.id}
							value={order.id}
							className="bg-card rounded-lg border border-border px-6"
						>
							<AccordionTrigger className="hover:no-underline py-4">
								<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-left w-full pr-4">
									<div>
										<p className="font-mono text-sm">
											#{order.id}
										</p>
										<p className="text-sm text-muted-foreground">
											{new Date(
												order.createdAt,
											).toLocaleDateString("ru-RU", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</p>
									</div>
									<div className="sm:ml-auto flex items-center gap-4">
										{getStatusBadge(order.status)}
										<span className="font-bold">
											{formatPrice(order.total)}
										</span>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="pb-4 space-y-4">
									{/* Items */}
									<div className="divide-y divide-border">
										{order.items.map(
											({ product, quantity }) => (
												<div
													key={product.id}
													className="flex gap-4 py-3"
												>
													<Link
														href={`/product/${product.id}`}
														className="w-16 h-16 rounded-md overflow-hidden shrink-0"
													>
														<Image
															src={
																product
																	.images[0] ||
																"/placeholder.svg"
															}
															alt={product.name}
															className="w-full h-full object-cover"
															width={64}
															height={64}
														/>
													</Link>
													<div className="flex-1 min-w-0">
														<Link
															href={`/product/${product.id}`}
															className="font-medium text-sm hover:underline line-clamp-1"
														>
															{product.name}
														</Link>
														<p className="text-sm text-muted-foreground">
															{quantity} шт. x{" "}
															{formatPrice(
																product.price,
															)}
														</p>
													</div>
													<div className="text-sm font-medium shrink-0">
														{formatPrice(
															product.price *
																quantity,
														)}
													</div>
												</div>
											),
										)}
									</div>

									{/* Shipping info */}
									<div className="bg-muted rounded-lg p-4 text-sm">
										<p className="font-medium mb-2">
											Адрес доставки
										</p>
										<p className="text-muted-foreground">
											{order.shippingAddress.name}
											<br />
											{order.shippingAddress.street}
											<br />
											{order.shippingAddress.city},{" "}
											{order.shippingAddress.postalCode}
										</p>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}
		</div>
	);
};
