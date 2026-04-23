'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useStore } from '@/lib/store-context'

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const shipping = cartTotal >= 5000 ? 0 : 500
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-2">Корзина пуста</h1>
            <p className="text-muted-foreground mb-6">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <Button asChild>
              <Link href="/catalog">
                Перейти в каталог
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Корзина</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-serif text-3xl font-bold mb-8">Корзина</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-card rounded-lg border border-border p-4 flex gap-4"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-md overflow-hidden"
                  >
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${product.id}`}
                      className="font-medium hover:text-accent transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </p>

                    {/* Mobile price */}
                    <div className="mt-2 sm:hidden">
                      <span className="font-bold">{formatPrice(product.price * quantity)}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Удалить</span>
                      </Button>
                    </div>
                  </div>

                  {/* Desktop price */}
                  <div className="hidden sm:block text-right">
                    <span className="font-bold text-lg">
                      {formatPrice(product.price * quantity)}
                    </span>
                    {quantity > 1 && (
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)} за шт.
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Clear cart button */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Очистить корзину
                </Button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="font-medium text-lg mb-4">Итого</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)} шт.)
                    </span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Бесплатно</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Бесплатная доставка от {formatPrice(5000)}
                    </p>
                  )}
                </div>

                <hr className="my-4 border-border" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">К оплате</span>
                  <span className="text-xl font-bold">{formatPrice(total)}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push('/checkout')}
                >
                  Оформить заказ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с условиями продажи
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
