import { useMutation, useQueryClient } from '@tanstack/react-query';

import { savePlaceInfo } from '../api/placeApi';
import { useTargetPlaceIdStore } from '../store/targetPlace.store';
import { IDetailsPlaceInfo } from '../types';

export const useSavePlaceInfo = () => {
	const queryClient = useQueryClient();
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);

	return useMutation({
		mutationKey: ['save', 'place', 'info'],
		mutationFn: (data: { queryParams: string; place: IDetailsPlaceInfo }) =>
			savePlaceInfo(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['details-place', targetPlaceId],
			});
		},
	});
};
