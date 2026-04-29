import { searchParamsCache } from "@/lib/search-params.util";
import { ProductContent } from "./_components/product-content";

const Page = async ({ searchParams }: PageProps<"/product/[id]">) => {
	await searchParamsCache.parse(searchParams);

	return <ProductContent />;
};

export default Page;
