"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/types/share";

const sortOptions: { value: SortOption; label: string }[] = [
	{ value: "popular", label: "По популярности" },
	{ value: "price-asc", label: "Сначала дешевле" },
	{ value: "price-desc", label: "Сначала дороже" },
	{ value: "rating", label: "По рейтингу" },
	{ value: "newest", label: "Сначала новые" },
];

export function CatalogSort({ value, onChange }: Props) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-45">
				<SelectValue placeholder="Сортировка" />
			</SelectTrigger>
			<SelectContent>
				{sortOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

interface Props {
	value: SortOption;
	onChange: (value: SortOption) => void;
}
