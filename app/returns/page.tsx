import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function ReturnsPage() {
  const steps = [
    {
      number: '1',
      title: 'Оформите заявку',
      description: 'Заполните форму возврата в личном кабинете или свяжитесь с нашей службой поддержки',
    },
    {
      number: '2',
      title: 'Упакуйте товар',
      description: 'Сохраните оригинальную упаковку и все комплектующие товара',
    },
    {
      number: '3',
      title: 'Отправьте товар',
      description: 'Передайте товар курьеру или отнесите в пункт приёма',
    },
    {
      number: '4',
      title: 'Получите деньги',
      description: 'После проверки товара деньги вернутся на карту в течение 3-10 дней',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Возврат товара
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Мы хотим, чтобы вы были довольны покупкой. Если что-то пошло не так, 
              вы можете вернуть товар в течение 30 дней.
            </p>
          </div>
        </section>

        {/* Return period banner */}
        <section className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-semibold">30 дней</div>
                  <div className="text-sm text-muted-foreground">на возврат</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-semibold">3-10 дней</div>
                  <div className="text-sm text-muted-foreground">возврат денег</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-accent" />
                <div>
                  <div className="font-semibold">Бесплатно</div>
                  <div className="text-sm text-muted-foreground">для бракованных товаров</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold mb-8 text-center">
              Как вернуть товар
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold mb-8 text-center">
                Условия возврата
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Товар надлежащего качества</h3>
                    <p className="text-sm text-muted-foreground">
                      Можно вернуть в течение 30 дней, если сохранён товарный вид, 
                      упаковка и все этикетки. Стоимость обратной доставки оплачивается покупателем.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Товар ненадлежащего качества</h3>
                    <p className="text-sm text-muted-foreground">
                      При обнаружении брака или дефекта возврат оформляется бесплатно. 
                      Мы компенсируем стоимость товара и доставки.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Товары, не подлежащие возврату</h3>
                    <p className="text-sm text-muted-foreground">
                      Согласно законодательству РФ, некоторые категории товаров 
                      (нижнее бельё, парфюмерия, косметика) не подлежат возврату 
                      при отсутствии брака.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold mb-8 text-center">
                Частые вопросы
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Как быстро вернут деньги?</h3>
                  <p className="text-muted-foreground text-sm">
                    После получения и проверки товара деньги возвращаются на карту 
                    в течение 3-10 рабочих дней в зависимости от вашего банка.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Можно ли обменять товар?</h3>
                  <p className="text-muted-foreground text-sm">
                    Да, вы можете обменять товар на аналогичный другого размера 
                    или цвета при наличии на складе.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Что делать, если товар пришёл повреждённым?</h3>
                  <p className="text-muted-foreground text-sm">
                    Сфотографируйте повреждения и свяжитесь с нашей службой поддержки. 
                    Мы оперативно решим вопрос с возвратом или заменой.
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  Это демо-версия интернет-магазина. Информация о возврате 
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
