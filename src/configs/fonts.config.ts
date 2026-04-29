import { Inter, Playfair_Display } from "next/font/google";

const _inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-inter",
});
const _playfair = Playfair_Display({
	subsets: ["latin", "cyrillic"],
	variable: "--font-playfair",
});

export const fontFamily = {
	inter: _inter,
	playfair: _playfair,
};
