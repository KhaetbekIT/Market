export interface Category {
	id: string;
	name: string;
	slug: string;
	subcategories: Subcategory[];
	image?: string;
}

export interface Subcategory {
	id: string;
	name: string;
	slug: string;
}
