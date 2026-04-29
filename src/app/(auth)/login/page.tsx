import { searchParamsCache } from "@/lib/search-params.util";
import { LoginContent } from "./_components/login-content";

const Page = async ({ searchParams }: PageProps<"/login">) => {
	await searchParamsCache.parse(searchParams);

	return <LoginContent />;
};

export default Page;
