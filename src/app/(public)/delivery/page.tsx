import { searchParamsCache } from "@/lib/search-params.util";
import { DeliveryContent } from "./_components/delivery-content";

const Page = async ({ searchParams }: PageProps<"/delivery">) => {
	await searchParamsCache.parse(searchParams);

	return <DeliveryContent />;
};

export default Page;
