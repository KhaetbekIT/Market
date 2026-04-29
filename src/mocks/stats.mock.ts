import { Award, Building2, TrendingUp, Users } from "lucide-react";

export const stats = [
	{ label: "Лет на рынке", value: "10+", icon: Building2 },
	{ label: "Довольных клиентов", value: "50 000+", icon: Users },
	{ label: "Товаров в каталоге", value: "10 000+", icon: Award },
	{ label: "Ежемесячных заказов", value: "5 000+", icon: TrendingUp },
] as const;
