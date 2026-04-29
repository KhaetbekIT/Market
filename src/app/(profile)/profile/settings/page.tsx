import { searchParamsCache } from "@/lib/search-params.util";
import { SettingsContent } from "./_components/settings-content";

const Page = async ({ searchParams }: PageProps<"/profile/settings">) => {
	await searchParamsCache.parse(searchParams);

	return <SettingsContent />;
};

export default Page;
