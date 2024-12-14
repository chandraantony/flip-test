import { useMemo } from 'react';
import { colors } from '../Constant';

const useColorPalette = (status: string) => {
	const colorPalette = useMemo(() => {
		switch (status) {
			case 'SUCCESS':
				return colors.green;
			case 'PENDING':
				return colors.orange;
			case 'FAILED':
				return colors.red;
			default:
				return colors.green;
		}
	}, [status]);

	return colorPalette;
};

export default useColorPalette;
