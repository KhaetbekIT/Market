import {
	CheckCircle,
	Clock,
	CreditCard,
	MapPin,
	Package,
	Truck,
} from "lucide-react";

export const DeliveryContent = () => {
	const deliveryMethods = [
		{
			icon: Truck,
			title: "Курьерская доставка",
			description: "Доставка до двери в удобное для вас время",
			price: "от 299 руб.",
			time: "1-3 дня",
		},
		{
			icon: Package,
			title: "Пункты выдачи",
			description: "Более 5000 пунктов выдачи по всей России",
			price: "от 199 руб.",
			time: "2-5 дней",
		},
		{
			icon: MapPin,
			title: "Почта России",
			description: "Доставка в любое почтовое отделение",
			price: "от 249 руб.",
			time: "5-14 дней",
		},
	];

	const paymentMethods = [
		{ name: "Банковская карта", description: "Visa, MasterCard, МИР" },
		{ name: "Электронные кошельки", description: "ЮMoney, QIWI, WebMoney" },
		{ name: "СБП", description: "Система быстрых платежей" },
		{ name: "Наличные", description: "При получении заказа" },
	];

	return (
		<>
			{/* Hero */}
			<section className="bg-primary text-primary-foreground py-16 md:py-24">
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
						Доставка и оплата
					</h1>
					<p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
						Мы предлагаем удобные способы доставки и оплаты, чтобы
						покупки были максимально комфортными для вас.
					</p>
				</div>
			</section>

			{/* Free shipping banner */}
			<section className="bg-accent text-accent-foreground py-4">
				<div className="container mx-auto px-4 text-center">
					<p className="font-medium flex items-center justify-center gap-2">
						<CheckCircle className="h-5 w-5" />
						Бесплатная доставка при заказе от 5000 руб.
					</p>
				</div>
			</section>

			{/* Delivery methods */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="font-serif text-2xl font-bold mb-8 text-center">
						Способы доставки
					</h2>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						{deliveryMethods.map((method) => (
							<div
								key={method.title}
								className="bg-card rounded-xl border border-border p-6 text-center"
							>
								<method.icon className="h-10 w-10 mx-auto mb-4 text-accent" />
								<h3 className="font-semibold mb-2">
									{method.title}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{method.description}
								</p>
								<div className="flex items-center justify-center gap-4 text-sm">
									<span className="flex items-center gap-1">
										<CreditCard className="h-4 w-4 text-muted-foreground" />
										{method.price}
									</span>
									<span className="flex items-center gap-1">
										<Clock className="h-4 w-4 text-muted-foreground" />
										{method.time}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Payment methods */}
			<section className="py-16 bg-card border-y border-border">
				<div className="container mx-auto px-4">
					<h2 className="font-serif text-2xl font-bold mb-8 text-center">
						Способы оплаты
					</h2>
					<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
						{paymentMethods.map((method) => (
							<div
								key={method.name}
								className="bg-background rounded-lg border border-border p-4 text-center"
							>
								<h3 className="font-medium mb-1">
									{method.name}
								</h3>
								<p className="text-xs text-muted-foreground">
									{method.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Additional info */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto space-y-8">
						<div>
							<h2 className="font-serif text-2xl font-bold mb-4">
								Сроки доставки
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Сроки доставки зависят от выбранного способа и
								вашего региона. Для Москвы и Санкт-Петербурга
								доступна доставка на следующий день. Для других
								регионов срок составляет от 2 до 14 дней в
								зависимости от удалённости.
							</p>
						</div>

						<div>
							<h2 className="font-serif text-2xl font-bold mb-4">
								Отслеживание заказа
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								После отправки заказа вы получите трек-номер для
								отслеживания. Статус заказа можно проверить в
								личном кабинете или по ссылке из
								письма-уведомления.
							</p>
						</div>

						<div className="bg-muted rounded-lg p-6 text-center">
							<p className="text-sm text-muted-foreground">
								Это демо-версия интернет-магазина. Информация о
								доставке является вымышленной и служит только
								для демонстрации.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
