import { useMutation } from '@tanstack/react-query';

import { savePlaceInfo } from '../api/placeApi';
import { IDetailsPlaceInfo } from '../types';

export const useSavePlaceInfo = () => {
	return useMutation({
		mutationKey: ['save', 'place', 'info'],
		mutationFn: (data: { queryParams: string; place: IDetailsPlaceInfo }) =>
			savePlaceInfo(data),
	});
};
