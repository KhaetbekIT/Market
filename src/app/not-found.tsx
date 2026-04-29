"use client";

import Link from "next/link";
import { ROUTERS } from "@/configs/router.config";

export default function NotFound() {
	return (
		<html lang="ru" translate="no">
			<head>
				<title>404</title>
			</head>
			<body>
				<main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
					<h1 className="text-6xl font-bold mb-4">404</h1>

					<h2 className="text-2xl font-semibold mb-2">
						Страница не найдена
					</h2>

					<p className="text-muted-foreground max-w-md mb-6">
						Возможно, вы перешли по неправильной ссылке или страница
						была удалена. Попробуйте вернуться на главную или
						воспользоваться поиском.
					</p>

					<div className="flex gap-4">
						<Link
							href={ROUTERS.MAIN}
							className="px-5 py-2 rounded-lg bg-black text-white hover:opacity-90"
						>
							На главную
						</Link>

						<Link
							href={ROUTERS.CATALOG}
							className="px-5 py-2 rounded-lg border hover:bg-muted"
						>
							В каталог
						</Link>
					</div>
				</main>
			</body>
		</html>
	);
}
