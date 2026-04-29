"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/mocks/mock-data";

const categoryImages: Record<string, string> = {
	electronics:
		"https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop",
	fashion:
		"https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
	home: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop",
	beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
};

export function CategoriesSection() {
	return (
		<section className="py-16 bg-secondary">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="font-serif text-3xl font-bold">Категории</h2>
					<p className="text-muted-foreground mt-2">
						Выберите категорию и найдите то, что вам нужно
					</p>
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/catalog?category=${category.slug}`}
							className="group relative aspect-square overflow-hidden rounded-xl"
						>
							<Image
								src={
									categoryImages[category.slug] ||
									"/placeholder.svg"
								}
								alt={category.name}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								width={400}
								height={400}
							/>
							<div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors" />
							<div className="absolute inset-0 flex flex-col items-center justify-center text-card">
								<h3 className="font-serif text-xl md:text-2xl font-bold">
									{category.name}
								</h3>
								<p className="text-sm mt-1 opacity-80">
									{category.subcategories.length} подкатегорий
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
