export const generateSKU = (productName: string) => {
	const prefix = productName.slice(0, 3).toLocaleUpperCase();
	const randomNumber = Math.floor(100 + Math.random() * 900);
	const SKU = `${prefix}-${randomNumber}`;
	return SKU;
};
