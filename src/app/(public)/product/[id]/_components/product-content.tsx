"use client";

import {
	Heart,
	Minus,
	Plus,
	RefreshCw,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTERS } from "@/configs/router.config";
import { useStore } from "@/contexts/store-context";
import { cn } from "@/lib/utils";
import { categories } from "@/mocks/mock-data";

export const ProductContent = () => {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const { products, getProduct, addToCart, toggleFavorite, isFavorite } =
		useStore();
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const product = mounted ? getProduct(id) : undefined;

	if (!product) {
		return (
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
				<p className="text-muted-foreground mb-6">
					Возможно, товар был удалён или перемещён
				</p>
				<Button onClick={() => router.push("/catalog")}>
					Перейти в каталог
				</Button>
			</div>
		);
	}

	const category = categories.find((c) => c.slug === product.category);
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

	// Related products from same category
	const relatedProducts = products
		.filter((p) => p.category === product.category && p.id !== product.id)
		.slice(0, 4);

	const handleAddToCart = () => {
		addToCart(product, quantity);
		setQuantity(1);
	};

	return !mounted ? (
		<Loading />
	) : (
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
						<BreadcrumbLink href={ROUTERS.CATALOG}>
							Каталог
						</BreadcrumbLink>
					</BreadcrumbItem>
					{category && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/catalog?category=${category.slug}`}
								>
									{category.name}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="max-w-50 truncate">
							{product.name}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Product details */}
			<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
				{/* Images */}
				<div className="space-y-4">
					<div className="aspect-square bg-card rounded-xl overflow-hidden border border-border">
						<Image
							src={
								product.images[selectedImage] ||
								"/placeholder.svg"
							}
							alt={product.name}
							className="w-full h-full object-cover"
							width={500}
							height={500}
						/>
					</div>
					{product.images.length > 1 && (
						<div className="flex gap-2 overflow-x-auto pb-2">
							{product.images.map((image, index) => (
								<button
									key={index.toString()}
									type="button"
									onClick={() => setSelectedImage(index)}
									className={cn(
										"w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors",
										selectedImage === index
											? "border-primary"
											: "border-transparent",
									)}
								>
									<Image
										src={image || "/placeholder.svg"}
										alt={`${product.name} ${index + 1}`}
										className="w-full h-full object-cover"
										width={100}
										height={100}
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Info */}
				<div>
					{/* Badges */}
					<div className="flex items-center gap-2 mb-4">
						{discount > 0 && (
							<span className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded">
								-{discount}%
							</span>
						)}
						{!product.inStock && (
							<span className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1 rounded">
								Нет в наличии
							</span>
						)}
					</div>

					{/* Name */}
					<h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">
						{product.name}
					</h1>

					{/* Rating */}
					<div className="flex items-center gap-2 mb-6">
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i.toString()}
									className={cn(
										"h-5 w-5",
										i < Math.floor(product.rating)
											? "fill-yellow-400 text-yellow-400"
											: "text-muted-foreground",
									)}
								/>
							))}
						</div>
						<span className="font-medium">{product.rating}</span>
						<span className="text-muted-foreground">
							({product.reviewCount} отзывов)
						</span>
					</div>

					{/* Price */}
					<div className="flex items-baseline gap-3 mb-6">
						<span className="text-3xl font-bold">
							{formatPrice(product.price)}
						</span>
						{product.oldPrice && (
							<span className="text-xl text-muted-foreground line-through">
								{formatPrice(product.oldPrice)}
							</span>
						)}
					</div>

					{/* Description */}
					<p className="text-muted-foreground mb-6 leading-relaxed">
						{product.description}
					</p>

					{/* Quantity and Add to cart */}
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="flex items-center border border-border rounded-md">
							<Button
								variant="ghost"
								size="icon"
								onClick={() =>
									setQuantity((q) => Math.max(1, q - 1))
								}
								disabled={quantity <= 1}
							>
								<Minus className="h-4 w-4" />
							</Button>
							<span className="w-12 text-center font-medium">
								{quantity}
							</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setQuantity((q) => q + 1)}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<Button
							size="lg"
							className="flex-1"
							disabled={!product.inStock}
							onClick={handleAddToCart}
						>
							<ShoppingCart className="h-5 w-5 mr-2" />
							{product.inStock
								? "Добавить в корзину"
								: "Нет в наличии"}
						</Button>
						<Button
							variant="outline"
							size="lg"
							className={cn(
								"bg-transparent",
								favorite && "text-accent border-accent",
							)}
							onClick={() => toggleFavorite(product.id)}
						>
							<Heart
								className={cn(
									"h-5 w-5",
									favorite && "fill-current",
								)}
							/>
						</Button>
					</div>

					{/* Benefits */}
					<div className="space-y-3 py-6 border-t border-border">
						<div className="flex items-center gap-3 text-sm">
							<Truck className="h-5 w-5 text-muted-foreground" />
							<span>Бесплатная доставка от 5000 руб.</span>
						</div>
						<div className="flex items-center gap-3 text-sm">
							<RefreshCw className="h-5 w-5 text-muted-foreground" />
							<span>Возврат в течение 30 дней</span>
						</div>
						<div className="flex items-center gap-3 text-sm">
							<Shield className="h-5 w-5 text-muted-foreground" />
							<span>Гарантия качества</span>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="description" className="mb-16">
				<TabsList>
					<TabsTrigger value="description">Описание</TabsTrigger>
					<TabsTrigger value="specifications">
						Характеристики
					</TabsTrigger>
					<TabsTrigger value="reviews">
						Отзывы ({product.reviewCount})
					</TabsTrigger>
				</TabsList>
				<TabsContent value="description" className="mt-6">
					<div className="bg-card rounded-lg border border-border p-6">
						<p className="text-muted-foreground leading-relaxed">
							{product.description}
						</p>
						<p className="text-muted-foreground leading-relaxed mt-4">
							Мы гарантируем высокое качество всех наших товаров.
							Если у вас возникнут вопросы или проблемы, наша
							служба поддержки всегда готова помочь.
						</p>
					</div>
				</TabsContent>
				<TabsContent value="specifications" className="mt-6">
					<div className="bg-card rounded-lg border border-border p-6">
						<dl className="divide-y divide-border">
							{Object.entries(product.specifications).map(
								([key, value]) => (
									<div
										key={key}
										className="py-3 flex justify-between"
									>
										<dt className="text-muted-foreground">
											{key}
										</dt>
										<dd className="font-medium">{value}</dd>
									</div>
								),
							)}
							<div className="py-3 flex justify-between">
								<dt className="text-muted-foreground">
									Категория
								</dt>
								<dd className="font-medium">
									{category?.name}
								</dd>
							</div>
						</dl>
					</div>
				</TabsContent>
				<TabsContent value="reviews" className="mt-6">
					<div className="bg-card rounded-lg border border-border p-6 text-center">
						<p className="text-muted-foreground">
							Отзывы временно недоступны в демо-версии
						</p>
					</div>
				</TabsContent>
			</Tabs>

			{/* Related products */}
			{relatedProducts.length > 0 && (
				<section>
					<h2 className="font-serif text-2xl font-bold mb-6">
						Похожие товары
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						{relatedProducts.map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
				</section>
			)}
		</div>
	);
};
