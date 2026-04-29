"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTERS } from "@/configs/router.config";
import { useStore } from "@/contexts/store-context";

export const RegisterContent = () => {
	const router = useRouter();
	const { register } = useStore();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Пароли не совпадают");
			return;
		}

		if (!agreeTerms) {
			setError("Необходимо принять условия использования");
			return;
		}

		setIsLoading(true);

		try {
			const success = await register(email, password, name);
			if (success) {
				router.push(ROUTERS.PROFILE);
			} else {
				setError("Ошибка регистрации");
			}
		} catch {
			setError("Произошла ошибка. Попробуйте ещё раз.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md px-4">
			<div className="bg-card rounded-xl border border-border p-8">
				<div className="text-center mb-8">
					<h1 className="font-serif text-2xl font-bold">
						Регистрация
					</h1>
					<p className="text-muted-foreground mt-2">
						Создайте новый аккаунт
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Имя</Label>
						<Input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Иван Иванов"
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
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Пароль</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Минимум 6 символов"
								minLength={6}
								required
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full px-3"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
								<span className="sr-only">
									{showPassword
										? "Скрыть пароль"
										: "Показать пароль"}
								</span>
							</Button>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">
							Подтвердите пароль
						</Label>
						<Input
							id="confirmPassword"
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Повторите пароль"
							required
						/>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="terms"
							checked={agreeTerms}
							onCheckedChange={(checked) =>
								setAgreeTerms(checked as boolean)
							}
						/>
						<Label
							htmlFor="terms"
							className="text-sm leading-relaxed cursor-pointer inline-block"
						>
							Я принимаю{" "}
							<Link
								href={ROUTERS.TERMS}
								className="underline hover:no-underline"
							>
								условия использования
							</Link>{" "}
							и{" "}
							<Link
								href={ROUTERS.PRIVACY}
								className="underline hover:no-underline"
							>
								политику конфиденциальности
							</Link>
						</Label>
					</div>

					{error && (
						<p className="text-sm text-destructive">{error}</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
					>
						{isLoading ? "Регистрация..." : "Зарегистрироваться"}
					</Button>
				</form>

				<p className="text-xs text-muted-foreground text-center mt-4 p-3 bg-muted rounded-lg">
					Это демо-версия. Данные хранятся только в вашем браузере.
				</p>

				<p className="text-center text-sm text-muted-foreground mt-6">
					Уже есть аккаунт?{" "}
					<Link
						href={ROUTERS.LOGIN}
						className="text-foreground hover:underline font-medium"
					>
						Войдите
					</Link>
				</p>
			</div>
		</div>
	);
};
