import { searchParamsCache } from "@/lib/search-params.util";
import { RegisterContent } from "./_components/register-content";

const Page = async ({ searchParams }: PageProps<"/register">) => {
	await searchParamsCache.parse(searchParams);

	return <RegisterContent />;
};

export default Page;
