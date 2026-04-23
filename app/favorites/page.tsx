'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
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

export default function FavoritesPage() {
  const { favorites, products } = useStore()

  const favoriteProducts = products.filter(p => favorites.includes(p.id))

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
                <BreadcrumbPage>Избранное</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-serif text-3xl font-bold mb-8">Избранное</h1>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="font-medium text-xl mb-2">Список избранного пуст</h2>
              <p className="text-muted-foreground mb-6">
                Добавляйте понравившиеся товары, чтобы не потерять их
              </p>
              <Button asChild>
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                {favoriteProducts.length}{' '}
                {favoriteProducts.length === 1
                  ? 'товар'
                  : favoriteProducts.length < 5
                  ? 'товара'
                  : 'товаров'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {favoriteProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
