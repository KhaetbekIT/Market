"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { type FormEvent, startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROUTERS } from "@/configs/router.config";
import { useStore } from "@/contexts/store-context";
import { searchParamsParsers } from "@/lib/search-params.util";
import { categories } from "@/mocks/mock-data";

export function Header() {
	const { cartCount, user, favorites } = useStore();
	const [searchOpen, setSearchOpen] = useState(false);
	const [{ query }, setSearchParams] = useQueryStates(searchParamsParsers);
	const router = useRouter();

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();

		router.push(`${ROUTERS.CATALOG}/?query=${query}`);
	};

	return (
		<header className="sticky top-0 z-50 bg-card border-b border-border">
			<div className="bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
					<p>Бесплатная доставка от 5000 руб.</p>
					<div className="hidden md:flex items-center gap-4">
						<Link href={ROUTERS.ABOUT} className="hover:underline">
							О нас
						</Link>
						<Link
							href={ROUTERS.DELIVERY}
							className="hover:underline"
						>
							Доставка
						</Link>
						<Link
							href={ROUTERS.CONTACTS}
							className="hover:underline"
						>
							Контакты
						</Link>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16 gap-4">
					{/* Mobile menu */}
					<Sheet>
						<SheetTrigger asChild className="lg:hidden">
							<Button variant="ghost" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Меню</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-75 bg-card">
							<nav className="flex flex-col gap-4 mt-8">
								<Link
									href={ROUTERS.CATALOG}
									className="text-lg font-medium hover:text-accent"
								>
									Каталог
								</Link>
								{categories.map((category) => (
									<Link
										key={category.id}
										href={`${ROUTERS.CATALOG}/?category=${category.slug}`}
										className="text-muted-foreground hover:text-foreground pl-4"
									>
										{category.name}
									</Link>
								))}
								<hr className="border-border" />
								<Link
									href={ROUTERS.ABOUT}
									className="hover:text-accent"
								>
									О нас
								</Link>
								<Link
									href={ROUTERS.DELIVERY}
									className="hover:text-accent"
								>
									Доставка
								</Link>
								<Link
									href={ROUTERS.CONTACTS}
									className="hover:text-accent"
								>
									Контакты
								</Link>
							</nav>
						</SheetContent>
					</Sheet>

					{/* Logo */}
					<Link
						href={ROUTERS.MAIN}
						className="font-serif text-2xl font-bold tracking-tight"
					>
						МАРКЕТ
					</Link>

					{/* Desktop navigation */}
					<nav className="hidden lg:flex items-center gap-6">
						<Link
							href={ROUTERS.CATALOG}
							className="text-sm font-medium hover:text-accent transition-colors"
						>
							Каталог
						</Link>
						{categories.slice(0, 4).map((category) => (
							<Link
								key={category.id}
								href={`${ROUTERS.CATALOG}/?category=${category.slug}`}
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								{category.name}
							</Link>
						))}
					</nav>

					{/* Search and actions */}
					<div className="flex items-center gap-2">
						{/* Desktop search */}
						<form
							onSubmit={handleSearch}
							className="hidden md:flex items-center"
						>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Поиск товаров..."
									value={query}
									onChange={(e) => {
										const value = e.target.value;

										startTransition(() => {
											setSearchParams(
												{ query: value },
												{ startTransition },
											);
										});
									}}
									className="pl-10 w-50 lg:w-75 bg-secondary border-0"
								/>
							</div>
						</form>

						{/* Mobile search toggle */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setSearchOpen(!searchOpen)}
						>
							{searchOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Search className="h-5 w-5" />
							)}
							<span className="sr-only">Поиск</span>
						</Button>

						{/* Favorites */}
						<Link href="/favorites">
							<Button
								variant="ghost"
								size="icon"
								className="relative"
							>
								<Heart className="h-5 w-5" />
								{favorites.length > 0 && (
									<span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
										{favorites.length}
									</span>
								)}
								<span className="sr-only">Избранное</span>
							</Button>
						</Link>

						{/* User */}
						<Link href={user ? ROUTERS.PROFILE : ROUTERS.LOGIN}>
							<Button variant="ghost" size="icon">
								<User className="h-5 w-5" />
								<span className="sr-only">
									{user ? "Профиль" : "Войти"}
								</span>
							</Button>
						</Link>

						{/* Cart */}
						<Link href={ROUTERS.CART}>
							<Button
								variant="ghost"
								size="icon"
								className="relative"
							>
								<ShoppingCart className="h-5 w-5" />
								{cartCount > 0 && (
									<span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
										{cartCount > 99 ? "99+" : cartCount}
									</span>
								)}
								<span className="sr-only">Корзина</span>
							</Button>
						</Link>
					</div>
				</div>

				{/* Mobile search bar */}
				{searchOpen && (
					<form onSubmit={handleSearch} className="pb-4 md:hidden">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Поиск товаров..."
								value={query}
								onChange={(e) => {
									const value = e.target.value;

									startTransition(() => {
										setSearchParams(
											{ query: value },
											{ startTransition },
										);
									});
								}}
								className="pl-10 w-full bg-secondary border-0"
								autoFocus
							/>
						</div>
					</form>
				)}
			</div>
		</header>
	);
}
