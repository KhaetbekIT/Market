'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { categories } from '@/lib/mock-data'
import type { FilterState } from '@/lib/types'

interface CatalogFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  maxPrice: number
}

export function CatalogFilters({
  filters,
  onFiltersChange,
  maxPrice,
}: CatalogFiltersProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categorySlug]
      : filters.categories.filter(c => c !== categorySlug)
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({ ...filters, inStock: checked })
  }

  const handleRatingChange = (rating: number | null) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? null : rating })
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, maxPrice],
      inStock: false,
      rating: null,
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice ||
    filters.inStock ||
    filters.rating !== null

  const FilterContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full justify-start text-muted-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Сбросить фильтры
        </Button>
      )}

      <Accordion type="multiple" defaultValue={['categories', 'price', 'stock', 'rating']}>
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Категории
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.slug}
                    checked={filters.categories.includes(category.slug)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category.slug}
                    className="text-sm cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Цена
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-1">
              <Slider
                min={0}
                max={maxPrice}
                step={1000}
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* In Stock */}
        <AccordionItem value="stock">
          <AccordionTrigger className="text-sm font-medium">
            Наличие
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
              />
              <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                Только в наличии
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">
            Рейтинг
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {[4, 3, 2].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center gap-2 w-full p-2 rounded-md text-sm transition-colors ${
                    filters.rating === rating
                      ? 'bg-secondary text-foreground'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                  <span>от {rating}</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
          <h3 className="font-medium mb-4">Фильтры</h3>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filters */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="sm" className="bg-transparent">
            <ChevronDown className="h-4 w-4 mr-2" />
            Фильтры
            {hasActiveFilters && (
              <span className="ml-2 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {filters.categories.length + (filters.inStock ? 1 : 0) + (filters.rating ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-card">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
