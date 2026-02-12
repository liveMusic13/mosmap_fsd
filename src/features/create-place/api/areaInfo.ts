import axios from 'axios';

import { IAreaDetails } from '../types';

export const getAreaInfo = async (
	lat: number,
	lng: number,
): Promise<IAreaDetails[]> => {
	const response = await axios.get<IAreaDetails[]>(
		`/api/detail-area?lat=${lat}&lng=${lng}`,
	);

	return response.data;
};
