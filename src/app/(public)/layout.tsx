import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fontFamily } from "@/configs/fonts.config";
import { StoreProvider } from "@/contexts/store-context";
import { Footer } from "@/layouts/footer.layout";
import { Header } from "@/layouts/header.layout";
import { cn } from "@/lib/utils";
import type { LayoutProps } from "@/types/layout.type";

export const metadata: Metadata = {
	title: "МАРКЕТ | Интернет-магазин",
	description: "Широкий выбор товаров для дома, электроники и моды",
	generator: "v0.app, Next.js, Khaetbek",
};

const PublicLayout = async ({ children }: LayoutProps) => {
	return (
		<html lang="ru" translate="no" className="h-full">
			<body
				className={cn(
					fontFamily.inter.variable,
					fontFamily.playfair.variable,
					"font-sans antialiased min-h-screen flex flex-col justify-between",
				)}
			>
				<Suspense fallback={<Skeleton />}>
					<NuqsAdapter>
						<StoreProvider>
							<Header />

							<main className="flex-1">{children}</main>

							<Footer />
						</StoreProvider>
					</NuqsAdapter>
				</Suspense>
			</body>
		</html>
	);
};

export default PublicLayout;
