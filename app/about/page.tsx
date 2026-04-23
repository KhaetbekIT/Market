import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Building2, Users, Award, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Лет на рынке', value: '10+', icon: Building2 },
    { label: 'Довольных клиентов', value: '50 000+', icon: Users },
    { label: 'Товаров в каталоге', value: '10 000+', icon: Award },
    { label: 'Ежемесячных заказов', value: '5 000+', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              О компании МАРКЕТ
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Мы - современный интернет-магазин, предлагающий широкий выбор 
              качественных товаров по доступным ценам с доставкой по всей России.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">Наша история</h2>
                <p className="text-muted-foreground leading-relaxed">
                  МАРКЕТ был основан в 2015 году с целью сделать онлайн-шопинг 
                  максимально удобным и доступным для каждого. За годы работы мы 
                  выросли из небольшого стартапа в крупную торговую площадку, 
                  которой доверяют тысячи покупателей по всей стране.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">Наша миссия</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы стремимся предоставить нашим клиентам лучший опыт покупок: 
                  широкий ассортимент качественных товаров, честные цены, быструю 
                  доставку и профессиональную поддержку. Каждый день мы работаем 
                  над тем, чтобы делать вашу жизнь проще и комфортнее.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">Наши преимущества</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Только проверенные товары от надёжных поставщиков</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Гарантия качества и возврат в течение 30 дней</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Быстрая доставка по всей России</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Профессиональная поддержка 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>Регулярные скидки и специальные предложения</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Это демо-версия интернет-магазина. Вся информация на странице 
                  является вымышленной и служит только для демонстрации.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
