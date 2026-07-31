import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Условия использования",
};

export default function TermsPage() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="font-serif text-3xl font-bold mb-6">
				Условия использования
			</h1>
			<div className="space-y-4 text-muted-foreground leading-relaxed">
				<p>
					МАРКЕТ — демонстрационный интернет-магазин. Размещённые
					товары, цены, отзывы и условия доставки используются для
					знакомства с возможностями сервиса.
				</p>
				<p>
					Оформление заказа не создаёт обязательств по оплате или
					поставке. Данные аккаунта сохраняются только в браузере
					пользователя.
				</p>
				<p>
					Продолжая работу с сайтом, вы соглашаетесь с обработкой
					локальных данных, необходимых для корзины, избранного и
					личного кабинета.
				</p>
			</div>
		</div>
	);
}
