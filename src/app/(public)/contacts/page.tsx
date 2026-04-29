import { searchParamsCache } from "@/lib/search-params.util";
import { ContactsContent } from "./_components/contacts-content";

const Page = async ({ searchParams }: PageProps<"/contacts">) => {
	await searchParamsCache.parse(searchParams);

	return <ContactsContent />;
};

export default Page;
