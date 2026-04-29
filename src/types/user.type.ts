import type { Address } from "./address.type";

export interface User {
	id: string;
	email: string;
	name: string;
	phone?: string;
	addresses: Address[];
}
