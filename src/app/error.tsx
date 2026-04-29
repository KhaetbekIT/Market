"use client";

import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Global error:", error);
	}, [error]);

	return (
		<html lang="ru" translate="no">
			<body>
				<main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
					<h1 className="text-4xl font-bold mb-4">
						Что-то пошло не так
					</h1>

					<p className="text-muted-foreground max-w-md mb-6">
						Произошла непредвиденная ошибка. Мы уже работаем над её
						устранением.
					</p>

					<button
						type="button"
						onClick={() => reset()}
						className="px-5 py-2 rounded-lg bg-black text-white"
					>
						Попробовать снова
					</button>
				</main>
			</body>
		</html>
	);
}
