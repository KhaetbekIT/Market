import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-12">
			<h1 className="font-serif text-3xl font-bold mb-6">
				Политика конфиденциальности
			</h1>
			<div className="space-y-4 text-muted-foreground leading-relaxed">
				<p>
					В демо-версии имя, email, телефон, адреса, корзина и история
					заказов сохраняются локально на вашем устройстве.
				</p>
				<p>
					Приложение не отправляет введённые учётные данные на внешний
					сервер и не обрабатывает реальные платёжные сведения.
				</p>
				<p>
					Удалить сохранённые данные можно очисткой данных сайта в
					настройках браузера.
				</p>
			</div>
		</div>
	);
}
