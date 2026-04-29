"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative bg-secondary overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
					{/* Content */}
					<div className="flex-1 text-center lg:text-left z-10">
						<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
							Качество и стиль
							<br />
							<span className="text-muted-foreground">
								для вашего дома
							</span>
						</h1>
						<p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 text-pretty">
							Откройте для себя широкий ассортимент товаров
							премиум-класса. От электроники до домашнего декора —
							всё в одном месте.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<Button asChild size="lg" className="group">
								<Link href="/catalog">
									Перейти в каталог
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="bg-transparent"
							>
								<Link href="/catalog?sale=true">
									Акции и скидки
								</Link>
							</Button>
						</div>
					</div>

					{/* Image */}
					<div className="flex-1 relative mt-8 lg:mt-0">
						<div className="relative w-full aspect-square max-w-[500px] mx-auto">
							<img
								src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop"
								alt="Современный интерьер"
								className="w-full h-full object-cover rounded-2xl shadow-2xl"
							/>
							{/* Floating badge */}
							<div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg">
								<p className="text-sm text-muted-foreground">
									Новая коллекция
								</p>
								<p className="text-2xl font-bold">2026</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
