"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/store-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product.type";

export function ProductCard({ product, className }: ProductCardProps) {
	const { addToCart, toggleFavorite, isFavorite } = useStore();
	const favorite = isFavorite(product.id);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("ru-RU", {
			style: "currency",
			currency: "RUB",
			maximumFractionDigits: 0,
		}).format(price);
	};

	const discount = product.oldPrice
		? Math.round((1 - product.price / product.oldPrice) * 100)
		: 0;

	return (
		<article
			className={cn(
				"group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow",
				className,
			)}
		>
			{/* Image */}
			<Link
				href={`/product/${product.id}`}
				className="block aspect-square overflow-hidden"
			>
				<img
					src={product.images[0] || "/placeholder.svg"}
					alt={product.name}
					className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</Link>

			{/* Badges */}
			<div className="absolute top-3 left-3 flex flex-col gap-2">
				{discount > 0 && (
					<span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
						-{discount}%
					</span>
				)}
				{!product.inStock && (
					<span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
						Нет в наличии
					</span>
				)}
			</div>

			{/* Favorite button */}
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					"absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card",
					favorite && "text-accent",
				)}
				onClick={(e) => {
					e.preventDefault();
					toggleFavorite(product.id);
				}}
			>
				<Heart className={cn("h-5 w-5", favorite && "fill-current")} />
				<span className="sr-only">
					{favorite
						? "Удалить из избранного"
						: "Добавить в избранное"}
				</span>
			</Button>

			{/* Content */}
			<div className="p-4">
				{/* Rating */}
				<div className="flex items-center gap-1 mb-2">
					<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
					<span className="text-sm font-medium">
						{product.rating}
					</span>
					<span className="text-sm text-muted-foreground">
						({product.reviewCount})
					</span>
				</div>

				{/* Name */}
				<Link href={`/product/${product.id}`}>
					<h3 className="font-medium text-sm line-clamp-2 hover:text-accent transition-colors">
						{product.name}
					</h3>
				</Link>

				{/* Price */}
				<div className="mt-2 flex items-baseline gap-2">
					<span className="text-lg font-bold">
						{formatPrice(product.price)}
					</span>
					{product.oldPrice && (
						<span className="text-sm text-muted-foreground line-through">
							{formatPrice(product.oldPrice)}
						</span>
					)}
				</div>

				{/* Add to cart */}
				<Button
					className="w-full mt-3"
					size="sm"
					disabled={!product.inStock}
					onClick={(e) => {
						e.preventDefault();
						addToCart(product);
					}}
				>
					<ShoppingCart className="h-4 w-4 mr-2" />
					{product.inStock ? "В корзину" : "Нет в наличии"}
				</Button>
			</div>
		</article>
	);
}

interface ProductCardProps {
	product: Product;
	className?: string;
}
