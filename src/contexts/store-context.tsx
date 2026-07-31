"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { generateProducts } from "@/mocks/mock-data";
import type { CartItem } from "@/types/cart.type";
import type { Order } from "@/types/order.type";
import type { Product } from "@/types/product.type";
import type { User } from "@/types/user.type";

interface StoreContextType {
	isInitialized: boolean;
	// Products
	products: Product[];
	getProduct: (id: string) => Product | undefined;
	regenerateProducts: () => void;

	// Cart
	cart: CartItem[];
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	cartTotal: number;
	cartCount: number;

	// User
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	register: (
		email: string,
		password: string,
		name: string,
	) => Promise<boolean>;
	updateUser: (data: Pick<User, "name" | "email" | "phone">) => void;
	logout: () => void;

	// Orders
	orders: Order[];
	createOrder: (
		shippingAddress: Order["shippingAddress"],
		paymentMethod: string,
	) => Order | null;

	// Favorites
	favorites: string[];
	toggleFavorite: (productId: string) => void;
	isFavorite: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
	CART: "market_cart",
	USER: "market_user",
	ORDERS: "market_orders",
	FAVORITES: "market_favorites",
	PRODUCTS: "market_products",
	ACCOUNTS: "market_accounts",
	VERSION: "market_version",
};

// Increment this to force regeneration of products
const DATA_VERSION = 3;

interface MockAccount {
	user: User;
	password: string;
}

const demoAccount: MockAccount = {
	user: {
		id: "demo-user",
		name: "Алексей Воронцов",
		email: "demo@market.ru",
		phone: "+7 (999) 123-45-67",
		addresses: [
			{
				id: "demo-address",
				name: "Дом",
				street: "ул. Тверская, д. 12, кв. 48",
				city: "Москва",
				postalCode: "125009",
				isDefault: true,
			},
		],
	},
	password: "market2026",
};

const createDemoOrders = (products: Product[]): Order[] => {
	const address = demoAccount.user.addresses[0];
	if (!address || products.length < 8) return [];

	return [
		{
			id: "MKT-260721",
			items: [
				{ product: products[0] as Product, quantity: 1 },
				{ product: products[18] as Product, quantity: 2 },
			],
			total: (products[0]?.price || 0) + (products[18]?.price || 0) * 2,
			status: "shipped",
			createdAt: "2026-07-27T10:30:00.000Z",
			shippingAddress: address,
			paymentMethod: "Банковская карта",
		},
		{
			id: "MKT-260614",
			items: [
				{ product: products[43] as Product, quantity: 1 },
				{ product: products[61] as Product, quantity: 1 },
			],
			total: (products[43]?.price || 0) + (products[61]?.price || 0),
			status: "delivered",
			createdAt: "2026-06-14T08:15:00.000Z",
			shippingAddress: address,
			paymentMethod: "СБП",
		},
		{
			id: "MKT-260402",
			items: [{ product: products[76] as Product, quantity: 1 }],
			total: products[76]?.price || 0,
			status: "delivered",
			createdAt: "2026-04-02T14:45:00.000Z",
			shippingAddress: address,
			paymentMethod: "Банковская карта",
		},
	];
};

export function StoreProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [orders, setOrders] = useState<Order[]>([]);
	const [favorites, setFavorites] = useState<string[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	// Initialize from localStorage
	useEffect(() => {
		if (typeof window === "undefined") return;

		// Check version - regenerate products if version changed
		const storedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
		const needsRegeneration = storedVersion !== String(DATA_VERSION);

		// Load products (generate if not exists or version changed)
		const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
		let loadedProducts: Product[];
		if (storedProducts && !needsRegeneration) {
			loadedProducts = JSON.parse(storedProducts);
		} else {
			loadedProducts = generateProducts();
			localStorage.setItem(
				STORAGE_KEYS.PRODUCTS,
				JSON.stringify(loadedProducts),
			);
			localStorage.setItem(STORAGE_KEYS.VERSION, String(DATA_VERSION));
		}
		setProducts(loadedProducts);

		if (!localStorage.getItem(STORAGE_KEYS.ACCOUNTS)) {
			localStorage.setItem(
				STORAGE_KEYS.ACCOUNTS,
				JSON.stringify([demoAccount]),
			);
		}

		// Load cart
		const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
		if (storedCart) setCart(JSON.parse(storedCart));

		// Load user
		const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
		const loadedUser: User | null = storedUser
			? JSON.parse(storedUser)
			: null;
		if (loadedUser) setUser(loadedUser);

		// Load orders
		const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
		const loadedOrders: Order[] = storedOrders
			? JSON.parse(storedOrders)
			: [];
		setOrders(
			loadedUser?.id === demoAccount.user.id && loadedOrders.length === 0
				? createDemoOrders(loadedProducts)
				: loadedOrders,
		);

		// Load favorites
		const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
		if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

		setIsInitialized(true);
	}, []);

	// Persist cart
	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
		}
	}, [cart, isInitialized]);

	// Persist user
	useEffect(() => {
		if (isInitialized) {
			if (user) {
				localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
			} else {
				localStorage.removeItem(STORAGE_KEYS.USER);
			}
		}
	}, [user, isInitialized]);

	// Persist orders
	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
		}
	}, [orders, isInitialized]);

	// Persist favorites
	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem(
				STORAGE_KEYS.FAVORITES,
				JSON.stringify(favorites),
			);
		}
	}, [favorites, isInitialized]);

	const getProduct = (id: string) => products.find((p) => p.id === id);

	const regenerateProducts = () => {
		const newProducts = generateProducts();
		setProducts(newProducts);
		localStorage.setItem(
			STORAGE_KEYS.PRODUCTS,
			JSON.stringify(newProducts),
		);
	};

	const addToCart = (product: Product, quantity = 1) => {
		setCart((prev) => {
			const existing = prev.find(
				(item) => item.product.id === product.id,
			);
			if (existing) {
				return prev.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			}
			return [...prev, { product, quantity }];
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prev) => prev.filter((item) => item.product.id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}
		setCart((prev) =>
			prev.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item,
			),
		);
	};

	const clearCart = () => setCart([]);

	const cartTotal = cart.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0,
	);

	const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

	const login = async (email: string, password: string): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const accounts: MockAccount[] = JSON.parse(
			localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || "[]",
		);
		const account = accounts.find(
			(item) =>
				item.user.email.toLowerCase() === email.trim().toLowerCase() &&
				item.password === password,
		);
		if (!account) return false;
		setUser(account.user);
		if (account.user.id === demoAccount.user.id && orders.length === 0) {
			setOrders(createDemoOrders(products));
		}
		return true;
	};

	const register = async (
		email: string,
		password: string,
		name: string,
	): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const accounts: MockAccount[] = JSON.parse(
			localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || "[]",
		);
		if (
			accounts.some(
				(item) =>
					item.user.email.toLowerCase() ===
					email.trim().toLowerCase(),
			)
		) {
			return false;
		}
		const mockUser: User = {
			id: crypto.randomUUID(),
			email: email.trim().toLowerCase(),
			name: name.trim(),
			addresses: [],
		};
		localStorage.setItem(
			STORAGE_KEYS.ACCOUNTS,
			JSON.stringify([...accounts, { user: mockUser, password }]),
		);
		setUser(mockUser);
		return true;
	};

	const updateUser = (data: Pick<User, "name" | "email" | "phone">) => {
		if (!user) return;
		const updatedUser = { ...user, ...data };
		const accounts: MockAccount[] = JSON.parse(
			localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || "[]",
		);
		localStorage.setItem(
			STORAGE_KEYS.ACCOUNTS,
			JSON.stringify(
				accounts.map((account) =>
					account.user.id === user.id
						? { ...account, user: updatedUser }
						: account,
				),
			),
		);
		setUser(updatedUser);
	};

	const logout = () => {
		setUser(null);
	};

	const createOrder = (
		shippingAddress: Order["shippingAddress"],
		paymentMethod: string,
	): Order | null => {
		if (cart.length === 0) return null;

		const order: Order = {
			id: Math.random().toString(36).substring(2, 11).toUpperCase(),
			items: [...cart],
			total: cartTotal,
			status: "pending",
			createdAt: new Date().toISOString(),
			shippingAddress,
			paymentMethod,
		};

		setOrders((prev) => [order, ...prev]);
		clearCart();
		return order;
	};

	const toggleFavorite = (productId: string) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId],
		);
	};

	const isFavorite = (productId: string) => favorites.includes(productId);

	return (
		<StoreContext.Provider
			value={{
				isInitialized,
				products,
				getProduct,
				regenerateProducts,
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				cartTotal,
				cartCount,
				user,
				login,
				register,
				updateUser,
				logout,
				orders,
				createOrder,
				favorites,
				toggleFavorite,
				isFavorite,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return context;
}
