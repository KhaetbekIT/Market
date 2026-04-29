import { searchParamsCache } from "@/lib/search-params.util";
import { OrdersContent } from "./_components/orders-content";

const Page = async ({ searchParams }: PageProps<"/profile/orders">) => {
	await searchParamsCache.parse(searchParams);

	return <OrdersContent />;
};

export default Page;
