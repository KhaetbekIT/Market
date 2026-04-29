"use client";

import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ContactsContent = () => {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Demo: just show success message
		setSubmitted(true);
	};

	const contacts = [
		{
			icon: Phone,
			title: "Телефон",
			value: "8 (800) 123-45-67",
			description: "Бесплатно по России",
		},
		{
			icon: Mail,
			title: "Email",
			value: "info@market.ru",
			description: "Ответим в течение 24 часов",
		},
		{
			icon: MapPin,
			title: "Адрес",
			value: "Москва, ул. Примерная, д. 1",
			description: "Офис и пункт выдачи",
		},
		{
			icon: Clock,
			title: "Режим работы",
			value: "Пн-Вс: 9:00-21:00",
			description: "Без выходных",
		},
	];

	return (
		<>
			<section className="bg-primary text-primary-foreground py-16 md:py-24">
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-serif text-3xl md:text-5xl font-bold mb-6">
						Контакты
					</h1>
					<p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
						Мы всегда рады помочь! Свяжитесь с нами любым удобным
						способом, и мы ответим в кратчайшие сроки.
					</p>
				</div>
			</section>

			{/* Contact info */}
			<section className="py-12 bg-card border-b border-border">
				<div className="container mx-auto px-4">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{contacts.map((contact) => (
							<div key={contact.title} className="text-center">
								<contact.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
								<h3 className="font-medium mb-1">
									{contact.title}
								</h3>
								<p className="font-semibold">{contact.value}</p>
								<p className="text-sm text-muted-foreground">
									{contact.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact form */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-xl mx-auto">
						<h2 className="font-serif text-2xl font-bold mb-8 text-center">
							Напишите нам
						</h2>

						{submitted ? (
							<div className="bg-card rounded-xl border border-border p-8 text-center">
								<CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
								<h3 className="text-xl font-semibold mb-2">
									Сообщение отправлено!
								</h3>
								<p className="text-muted-foreground mb-6">
									Спасибо за ваше обращение. Мы свяжемся с
									вами в ближайшее время.
								</p>
								<Button onClick={() => setSubmitted(false)}>
									Отправить ещё сообщение
								</Button>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="bg-card rounded-xl border border-border p-6 md:p-8"
							>
								<div className="space-y-4">
									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="name">
												Ваше имя
											</Label>
											<Input
												id="name"
												placeholder="Иван Иванов"
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												placeholder="ivan@example.com"
												required
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="phone">Телефон</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="+7 (999) 123-45-67"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="subject">
											Тема обращения
										</Label>
										<Input
											id="subject"
											placeholder="Вопрос о заказе"
											required
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">
											Сообщение
										</Label>
										<Textarea
											id="message"
											placeholder="Опишите ваш вопрос или проблему..."
											rows={5}
											required
										/>
									</div>

									<Button
										type="submit"
										className="w-full"
										size="lg"
									>
										<Send className="h-4 w-4 mr-2" />
										Отправить сообщение
									</Button>
								</div>
							</form>
						)}

						<div className="bg-muted rounded-lg p-6 text-center mt-8">
							<p className="text-sm text-muted-foreground">
								Это демо-версия интернет-магазина. Сообщения не
								отправляются и служат только для демонстрации
								формы.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
