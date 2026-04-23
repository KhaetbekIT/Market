'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid3X3, LayoutList } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { CatalogFilters } from '@/components/catalog-filters'
import { CatalogSort } from '@/components/catalog-sort'
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
import { categories } from '@/lib/mock-data'
import type { FilterState, Product, SortOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import Loading from './loading' // Import the Loading component

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const { products } = useStore()
  
  const categoryParam = searchParams.get('category')
  const searchQuery = searchParams.get('search')
  const saleParam = searchParams.get('sale')

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 200000
    return Math.max(...products.map(p => p.price))
  }, [products])

  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    priceRange: [0, maxPrice],
    inStock: false,
    rating: null,
  })
  const [sort, setSort] = useState<SortOption>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Update filters when URL params change
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam],
      }))
    }
  }, [categoryParam])

  // Update max price when products load
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], maxPrice],
    }))
  }, [maxPrice])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sale filter
    if (saleParam === 'true') {
      result = result.filter(p => p.oldPrice)
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // Price filter
    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // In stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inStock)
    }

    // Rating filter
    if (filters.rating) {
      result = result.filter(p => p.rating >= filters.rating!)
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
      default: // popular
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [products, filters, sort, searchQuery, saleParam])

  const currentCategory = categoryParam
    ? categories.find(c => c.slug === categoryParam)
    : null

  const pageTitle = searchQuery
    ? `Поиск: "${searchQuery}"`
    : saleParam === 'true'
    ? 'Акции и скидки'
    : currentCategory
    ? currentCategory.name
    : 'Каталог'

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
              {currentCategory ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentCategory.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold">{pageTitle}</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'товар'
                : filteredProducts.length < 5
                ? 'товара'
                : 'товаров'}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters sidebar - desktop only */}
            <CatalogFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={maxPrice}
            />

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2 lg:hidden">
                  {/* Mobile filters button */}
                  <CatalogFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    maxPrice={maxPrice}
                  />
                </div>
                <div className="hidden lg:block" />
                <div className="flex items-center gap-2">
                  <CatalogSort value={sort} onChange={setSort} />
                  <div className="hidden sm:flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-r-none',
                        viewMode === 'grid' && 'bg-secondary'
                      )}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="h-4 w-4" />
                      <span className="sr-only">Сетка</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-l-none',
                        viewMode === 'list' && 'bg-secondary'
                      )}
                      onClick={() => setViewMode('list')}
                    >
                      <LayoutList className="h-4 w-4" />
                      <span className="sr-only">Список</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product grid */}
              {filteredProducts.length > 0 ? (
                <div
                  className={cn(
                    'grid gap-4 md:gap-6',
                    viewMode === 'grid'
                      ? 'grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg font-medium">Товары не найдены</p>
                  <p className="text-muted-foreground mt-1">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() =>
                      setFilters({
                        categories: [],
                        priceRange: [0, maxPrice],
                        inStock: false,
                        rating: null,
                      })
                    }
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// loading.tsx
// export default function Loading() {
//   return null
// }
