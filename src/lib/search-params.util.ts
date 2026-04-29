import { useQueryStates } from "nuqs";
import {
	createSearchParamsCache,
	createSerializer,
	parseAsBoolean,
	parseAsString,
} from "nuqs/server";

// для клиентной части
export const searchParamsParsers = {
	tab: parseAsString.withDefault("").withOptions({
		shallow: false,
		history: "replace",
		clearOnDefault: true,
	}),
	query: parseAsString.withDefault("").withOptions({
		shallow: false,
		history: "replace",
		clearOnDefault: true,
	}),
	category: parseAsString.withDefault("").withOptions({
		shallow: false,
		history: "replace",
		clearOnDefault: true,
	}),
	sale: parseAsBoolean.withDefault(false).withOptions({
		shallow: false,
		history: "replace",
		clearOnDefault: true,
	}),
};

export const serialize = createSerializer(searchParamsParsers);

// для серверной части
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
export const useQueryParams = () => useQueryStates(searchParamsParsers);
