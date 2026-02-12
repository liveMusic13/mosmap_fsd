import axios from 'axios';

import type { IColorInterval } from '../types';

import { API_URL } from '@/shared/constants';

export const getColorInterval = async (
	mapParam: string,
): Promise<IColorInterval> => {
	const isNumeric = /^\d+$/.test(mapParam);

	if (isNumeric) {
		const { data } = await axios.get(
			`${API_URL}/api/color_interval.php?map=${mapParam}`,
		);
		return data;
	} else {
		const { data } = await axios.get(
			`${API_URL}/api/color_interval.php?url=${mapParam}`,
		);
		return data;
	}
};
