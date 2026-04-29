import { useEffect, useState } from "react";

/**
 * Used to debounce a quickly changing value.
 * Will return the latest value after a specified amount of time.
 *
 * @param {T} value
 * @param delay
 * @returns {Readonly<T>} latest value
 * @see https://react-hooks-library.vercel.app/core/useDebounce
 */
export function useDebounce<T>(value: T, delay: number): Readonly<T> {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		if (delay <= 0) return;

		const tick = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(tick);
	}, [value, delay]);

	if (delay <= 0) return value;
	return debouncedValue;
}
