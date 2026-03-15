import axios from 'axios';

import { IAvailabilityZone } from '../types';

export const getAvailabilityZone = async ({
	id,
	lat,
	lng,
}: {
	id: number | null;
	lat?: number;
	lng?: number;
}): Promise<IAvailabilityZone> => {
	if (id) {
		const response = await axios.get(
			`/api/availability-zone?id=${id}&radius=5`,
		);

		return response.data;
	} else {
		const response = await axios.get(
			`/api/availability-zone?lng=${lng}&lat=${lat}&radius=5`,
		);

		return response.data;
	}
};
