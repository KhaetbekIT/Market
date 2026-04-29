import { searchParamsCache } from "@/lib/search-params.util";
import { CatalogContent } from "./_components/catalog-content";

const Page = async ({ searchParams }: PageProps<"/catalog">) => {
	await searchParamsCache.parse(searchParams);

	return <CatalogContent />;
};

export default Page;
