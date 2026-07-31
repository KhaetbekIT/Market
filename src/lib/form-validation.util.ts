export const PHONE_PATTERN = "^\\+?[0-9\\s().-]{7,25}$";

export const isInternationalPhone = (value: string) => {
	const trimmed = value.trim();
	if (!/^\+?[\d\s().-]+$/.test(trimmed)) return false;

	const digits = trimmed.replace(/\D/g, "");
	return digits.length >= 7 && digits.length <= 15;
};

export const isPostalCode = (value: string) => {
	const trimmed = value.trim();
	return trimmed.length >= 2 && trimmed.length <= 16;
};
