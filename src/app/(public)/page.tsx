import { searchParamsCache } from "@/lib/search-params.util";
import { PublicContent } from "./_components/public-content";

const Page = async ({ searchParams }: PageProps<"/">) => {
	await searchParamsCache.parse(searchParams);
	return <PublicContent />;
};

export default Page;
