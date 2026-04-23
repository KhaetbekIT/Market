'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, CreditCard, Truck, Wallet } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useStore } from '@/lib/store-context'
import type { Address } from '@/lib/types'
import { cn } from '@/lib/utils'

type CheckoutStep = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, user, createOrder } = useStore()
  const [step, setStep] = useState<CheckoutStep>('shipping')
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: '',
    street: '',
    postalCode: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<string>('card')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const shipping = cartTotal >= 5000 ? 0 : 500
  const total = cartTotal + shipping

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const address: Address = {
      id: Math.random().toString(36).substring(2, 11),
      name: shippingData.name,
      street: shippingData.street,
      city: shippingData.city,
      postalCode: shippingData.postalCode,
      isDefault: false,
    }

    const order = createOrder(address, paymentMethod)
    if (order) {
      setOrderId(order.id)
      setStep('confirmation')
    }
    setIsLoading(false)
  }

  // Redirect if cart is empty and not on confirmation
  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-serif text-2xl font-bold mb-2">Корзина пуста</h1>
            <p className="text-muted-foreground mb-6">
              Добавьте товары, чтобы оформить заказ
            </p>
            <Button asChild>
              <Link href="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const steps = [
    { key: 'shipping', label: 'Доставка' },
    { key: 'payment', label: 'Оплата' },
    { key: 'confirmation', label: 'Готово' },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === step)

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
                <BreadcrumbLink href="/cart">Корзина</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Оформление заказа</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-serif text-3xl font-bold mb-8">Оформление заказа</h1>

          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-8 gap-2">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    index < currentStepIndex
                      ? 'bg-primary text-primary-foreground'
                      : index === currentStepIndex
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {index < currentStepIndex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm hidden sm:inline',
                    index === currentStepIndex ? 'font-medium' : 'text-muted-foreground'
                  )}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 sm:w-16 h-px bg-border mx-2 sm:mx-4" />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Shipping step */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="bg-card rounded-lg border border-border p-6">
                  <h2 className="font-medium text-lg mb-6 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Данные доставки
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя и фамилия</Label>
                      <Input
                        id="name"
                        value={shippingData.name}
                        onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                        required
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        required
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        required
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Город</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                        placeholder="Москва"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Индекс</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        required
                        placeholder="123456"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="street">Адрес</Label>
                      <Input
                        id="street"
                        value={shippingData.street}
                        onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                        required
                        placeholder="ул. Примерная, д. 1, кв. 1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="ghost" asChild>
                      <Link href="/cart">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Назад
                      </Link>
                    </Button>
                    <Button type="submit">
                      Продолжить
                    </Button>
                  </div>
                </form>
              )}

              {/* Payment step */}
              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="bg-card rounded-lg border border-border p-6">
                  <h2 className="font-medium text-lg mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Способ оплаты
                  </h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <label
                      htmlFor="card"
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                      )}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Банковская карта</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
                      </div>
                    </label>

                    <label
                      htmlFor="wallet"
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                        paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-border'
                      )}
                    >
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Wallet className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Электронный кошелёк</p>
                        <p className="text-sm text-muted-foreground">ЮMoney, QIWI, WebMoney</p>
                      </div>
                    </label>

                    <label
                      htmlFor="cash"
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                        paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-border'
                      )}
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <Truck className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Наличными при получении</p>
                        <p className="text-sm text-muted-foreground">Оплата курьеру</p>
                      </div>
                    </label>
                  </RadioGroup>

                  <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                    Это демо-версия магазина. Реальная оплата не производится.
                  </p>

                  <div className="flex justify-between mt-6">
                    <Button variant="ghost" type="button" onClick={() => setStep('shipping')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Назад
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Обработка...' : 'Оплатить'}
                    </Button>
                  </div>
                </form>
              )}

              {/* Confirmation step */}
              {step === 'confirmation' && (
                <div className="bg-card rounded-lg border border-border p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold mb-2">Заказ оформлен!</h2>
                  <p className="text-muted-foreground mb-4">
                    Номер вашего заказа: <span className="font-mono font-medium">{orderId}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Мы отправили подтверждение на {shippingData.email}.<br />
                    Ожидаемое время доставки: 1-3 рабочих дня.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <Link href="/profile/orders">Мои заказы</Link>
                    </Button>
                    <Button variant="outline" asChild className="bg-transparent">
                      <Link href="/catalog">Продолжить покупки</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary */}
            {step !== 'confirmation' && (
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="font-medium text-lg mb-4">Ваш заказ</h2>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{quantity} шт.</p>
                        </div>
                        <div className="text-sm font-medium shrink-0">
                          {formatPrice(product.price * quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4 border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товары</span>
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
                  </div>

                  <hr className="my-4 border-border" />

                  <div className="flex justify-between items-center">
                    <span className="font-medium">Итого</span>
                    <span className="text-xl font-bold">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
