'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useStore } from '@/lib/store-context'

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setName(user.name)
      setEmail(user.email)
      setPhone(user.phone || '')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the user
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
                <BreadcrumbLink href="/profile">Профиль</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Настройки</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-serif text-3xl font-bold mb-8">Настройки</h1>

          <div className="max-w-xl">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="font-medium text-lg mb-6">Личные данные</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button type="submit">Сохранить</Button>
                  {saved && (
                    <span className="text-sm text-green-600">
                      Изменения сохранены
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 mt-6">
              <h2 className="font-medium text-lg mb-4">Демо-режим</h2>
              <p className="text-sm text-muted-foreground">
                Это демо-версия интернет-магазина. Все данные хранятся локально 
                в вашем браузере и будут удалены при очистке кеша. Реальная 
                регистрация и оплата не производятся.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
