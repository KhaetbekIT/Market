export const debouncedSearch = (cb: () => void, timeout = 1000) => {
	let timer: NodeJS.Timeout;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(cb, timeout);
	};
};
