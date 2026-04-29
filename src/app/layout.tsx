import "@/css/globals.css";
import type { Metadata } from "next";
import type { LayoutProps } from "@/types/layout.type";

export const metadata: Metadata = {
	title: {
		default: "МАРКЕТ",
		template: "%s | МАРКЕТ",
	},
	description: "МАРКЕТ - маркетплейс для покупки и продажи товаров",
};

const RootLayout = ({ children }: LayoutProps) => {
	return children;
};

export default RootLayout;
