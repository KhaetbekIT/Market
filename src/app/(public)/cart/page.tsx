import { searchParamsCache } from "@/lib/search-params.util";
import { CartContent } from "./_components/cart-content";

const Page = async ({ searchParams }: PageProps<"/cart">) => {
	await searchParamsCache.parse(searchParams);

	return <CartContent />;
};

export default Page;
