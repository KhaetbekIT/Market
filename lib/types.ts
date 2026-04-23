export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: string
  subcategory: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  specifications: Record<string, string>
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  addresses: Address[]
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  postalCode: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  shippingAddress: Address
  paymentMethod: string
}

export interface Category {
  id: string
  name: string
  slug: string
  subcategories: Subcategory[]
  image?: string
}

export interface Subcategory {
  id: string
  name: string
  slug: string
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  inStock: boolean
  rating: number | null
}
