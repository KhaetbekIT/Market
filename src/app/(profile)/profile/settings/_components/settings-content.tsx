"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTERS } from "@/configs/router.config";
import { useStore } from "@/contexts/store-context";
import {
	isInternationalPhone,
	PHONE_PATTERN,
} from "@/lib/form-validation.util";

export const SettingsContent = () => {
	const router = useRouter();
	const { user, isInitialized, updateUser } = useStore();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (isInitialized && !user) {
			router.push(ROUTERS.LOGIN);
		} else if (user) {
			setName(user.name);
			setEmail(user.email);
			setPhone(user.phone || "");
		}
	}, [user, isInitialized, router]);

	if (!isInitialized || !user) {
		return null;
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError("");
		if (phone.trim() && !isInternationalPhone(phone)) {
			setError(
				"Введите телефон в международном формате: от 7 до 15 цифр.",
			);
			return;
		}
		updateUser({
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
		});
		setSaved(true);
		setTimeout(() => setSaved(false), 3000);
	};

	return (
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
								minLength={2}
								maxLength={100}
								autoComplete="name"
								required
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
								autoComplete="email"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Телефон</Label>
							<Input
								id="phone"
								type="tel"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								pattern={PHONE_PATTERN}
								maxLength={25}
								autoComplete="tel"
								title="Используйте международный формат: +998 90 123 45 67"
								placeholder="+998 90 123 45 67"
							/>
						</div>

						{error && (
							<p className="text-sm text-destructive">{error}</p>
						)}

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
						Это демо-версия интернет-магазина. Все данные хранятся
						локально в вашем браузере и будут удалены при очистке
						кеша. Реальная регистрация и оплата не производятся.
					</p>
				</div>
			</div>
		</div>
	);
};
