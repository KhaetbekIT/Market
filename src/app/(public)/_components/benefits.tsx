import { CreditCard, Headphones, RefreshCw, Truck } from "lucide-react";

const benefits = [
	{
		icon: Truck,
		title: "Быстрая доставка",
		description: "Доставим ваш заказ в течение 1-3 дней",
	},
	{
		icon: RefreshCw,
		title: "Возврат 30 дней",
		description: "Вернём деньги, если товар не подойдёт",
	},
	{
		icon: CreditCard,
		title: "Безопасная оплата",
		description: "Принимаем карты и электронные кошельки",
	},
	{
		icon: Headphones,
		title: "Поддержка 24/7",
		description: "Всегда готовы ответить на ваши вопросы",
	},
];

export function BenefitsSection() {
	return (
		<section className="py-12 bg-card border-y border-border">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{benefits.map((benefit) => (
						<div
							key={benefit.title}
							className="flex flex-col items-center text-center"
						>
							<div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
								<benefit.icon className="h-6 w-6 text-foreground" />
							</div>
							<h3 className="font-medium text-sm md:text-base">
								{benefit.title}
							</h3>
							<p className="text-muted-foreground text-xs md:text-sm mt-1">
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
