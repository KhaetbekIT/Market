import { BenefitsSection } from "./benefits";
import { CategoriesSection } from "./categories";
import { FeaturedProducts } from "./featured-products";
import { Hero } from "./hero";

export const PublicContent = () => {
	return (
		<>
			<Hero />
			<BenefitsSection />
			<FeaturedProducts />
			<CategoriesSection />
		</>
	);
};
