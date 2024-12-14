export const sortBy = [
	{
		label: 'Default',
		value: 0,
	},
	{
		label: 'Name A-Z',
		value: 1,
	},
	{
		label: 'Name Z-A',
		value: 2,
	},
	{
		label: 'Date Newest',
		value: 3,
	},
	{
		label: 'Date Oldest',
		value: 4,
	},
];

export const colors = {
	red: '#FA4032',
	white: '#FFF',
	orange: '#F26B0F',
	gray: '#9AA6B2',
	green: '#118B50',
	black: '#000',
};

export const formatDate = (inputDate: any): string => {
	const date = new Date(inputDate);
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
	return date.toLocaleDateString('id-ID', options);
};

export const formatCurrency = (amount: any, locale: string = 'id-ID'): string => {
	const format = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(amount);
	return format;
};
