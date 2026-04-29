import { searchParamsCache } from "@/lib/search-params.util";
import { ReturnsContent } from "./_components/returns-content";

const Page = async ({ searchParams }: PageProps<"/returns">) => {
	await searchParamsCache.parse(searchParams);

	return <ReturnsContent />;
};

export default Page;
