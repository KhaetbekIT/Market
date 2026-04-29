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
	VERSION: "market_version",
};

// Increment this to force regeneration of products
const DATA_VERSION = 2;

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
		if (storedProducts && !needsRegeneration) {
			setProducts(JSON.parse(storedProducts));
		} else {
			const newProducts = generateProducts();
			setProducts(newProducts);
			localStorage.setItem(
				STORAGE_KEYS.PRODUCTS,
				JSON.stringify(newProducts),
			);
			localStorage.setItem(STORAGE_KEYS.VERSION, String(DATA_VERSION));
		}

		// Load cart
		const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
		if (storedCart) setCart(JSON.parse(storedCart));

		// Load user
		const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
		if (storedUser) setUser(JSON.parse(storedUser));

		// Load orders
		const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
		if (storedOrders) setOrders(JSON.parse(storedOrders));

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

	const login = async (
		email: string,
		_password: string,
	): Promise<boolean> => {
		// Mock login - always succeeds
		await new Promise((resolve) => setTimeout(resolve, 500));
		const mockUser: User = {
			id: Math.random().toString(36).substring(2, 11),
			email,
			name: email.split("@")[0] || "",
			addresses: [],
		};
		setUser(mockUser);
		return true;
	};

	const register = async (
		email: string,
		_password: string,
		name: string,
	): Promise<boolean> => {
		// Mock registration - always succeeds
		await new Promise((resolve) => setTimeout(resolve, 500));
		const mockUser: User = {
			id: Math.random().toString(36).substring(2, 11),
			email,
			name,
			addresses: [],
		};
		setUser(mockUser);
		return true;
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
