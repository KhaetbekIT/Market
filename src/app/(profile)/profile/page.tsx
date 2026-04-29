import { searchParamsCache } from "@/lib/search-params.util";
import { ProfileContent } from "./_components/profile-content";

const Page = async ({ searchParams }: PageProps<"/profile">) => {
	await searchParamsCache.parse(searchParams);

	return <ProfileContent />;
};

export default Page;
