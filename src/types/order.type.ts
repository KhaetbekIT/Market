import type { Address } from "./address.type";
import type { CartItem } from "./cart.type";

export interface Order {
	id: string;
	items: CartItem[];
	total: number;
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	createdAt: string;
	shippingAddress: Address;
	paymentMethod: string;
}
