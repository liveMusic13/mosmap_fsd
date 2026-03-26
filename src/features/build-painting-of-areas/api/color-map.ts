import axios from 'axios';

import { IColorMap } from '../types';

export const getColorMap = async (
	mapParam: string,
	sloi: number,
	mode: number,
	field_id: number,
): Promise<IColorMap[]> => {
	const isNumeric = /^\d+$/.test(mapParam);

	if (isNumeric) {
		const { data } = await axios.get(
			`/api/painting-of-areas/color-map?map=${mapParam}&sloi=${sloi}&mode=${mode}&field_id=${field_id}`,
		);
		return data;
	} else {
		const { data } = await axios.get(
			`/api/painting-of-areas/color-map?url=${mapParam}&sloi=${sloi}&mode=${mode}&field_id=${field_id}`,
		);
		return data;
	}
};
