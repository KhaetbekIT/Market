export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	oldPrice?: number;
	category: string;
	subcategory: string;
	images: string[];
	rating: number;
	reviewCount: number;
	inStock: boolean;
	specifications: Record<string, string>;
	tags: string[];
}
