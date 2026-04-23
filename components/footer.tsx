import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl font-bold">
              МАРКЕТ
            </Link>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              Ваш надёжный интернет-магазин с широким выбором товаров для дома, 
              электроники и моды.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-medium mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/catalog?category=electronics" className="hover:text-primary-foreground transition-colors">
                  Электроника
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=fashion" className="hover:text-primary-foreground transition-colors">
                  Мода
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=home" className="hover:text-primary-foreground transition-colors">
                  Дом и сад
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=beauty" className="hover:text-primary-foreground transition-colors">
                  Красота
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-medium mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/about" className="hover:text-primary-foreground transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-primary-foreground transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary-foreground transition-colors">
                  Возврат товара
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary-foreground transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>8 (800) 123-45-67</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@market.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Москва, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-foreground/20 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>2026 МАРКЕТ. Все права защищены.</p>
          <p className="text-xs">
            Это демо-версия интернет-магазина. Все данные являются фиктивными.
          </p>
        </div>
      </div>
    </footer>
  )
}
