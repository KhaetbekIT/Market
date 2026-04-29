"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/store-context";
import { ProductCard } from "./product-card";

export function FeaturedProducts() {
	const { products } = useStore();

	// Get featured products (with discounts or high ratings)
	const featuredProducts = products
		.filter((p) => p.oldPrice || p.rating >= 4.5)
		.slice(0, 8);

	if (featuredProducts.length === 0) {
		return null;
	}

	return (
		<section className="py-16 bg-background">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="font-serif text-3xl font-bold">
							Популярные товары
						</h2>
						<p className="text-muted-foreground mt-1">
							Лучшие предложения этой недели
						</p>
					</div>
					<Button asChild variant="ghost" className="hidden sm:flex">
						<Link href="/catalog">
							Смотреть все
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					{featuredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>

				<div className="mt-8 text-center sm:hidden">
					<Button asChild>
						<Link href="/catalog">
							Смотреть все товары
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
