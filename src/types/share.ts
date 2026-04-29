export type SortOption =
	| "popular"
	| "price-asc"
	| "price-desc"
	| "rating"
	| "newest";

export interface FilterState {
	categories: string[];
	priceRange: [number, number];
	inStock: boolean;
	rating: number | null;
}
