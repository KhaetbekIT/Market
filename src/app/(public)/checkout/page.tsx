import { searchParamsCache } from "@/lib/search-params.util";
import { CheckoutContent } from "./_components/checkout-content";

const Page = async ({ searchParams }: PageProps<"/checkout">) => {
	await searchParamsCache.parse(searchParams);

	return <CheckoutContent />;
};

export default Page;
