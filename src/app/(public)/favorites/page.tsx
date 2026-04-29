import { searchParamsCache } from "@/lib/search-params.util";
import { FavoritesContent } from "./_components/favorites-content";

const Page = async ({ searchParams }: PageProps<"/favorites">) => {
	await searchParamsCache.parse(searchParams);

	return <FavoritesContent />;
};

export default Page;
