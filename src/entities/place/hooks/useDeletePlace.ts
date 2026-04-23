import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePlace } from '../api/placeApi';

import { useViewBlocksStore } from '@/shared/store/panelOptions.store';

export const useDeletePlace = () => {
	const fullCloseView = useViewBlocksStore(store => store.fullCloseView);
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['delete', 'place'],
		mutationFn: (id: number) => deletePlace(id),
		onSuccess: () => {
			fullCloseView();
			queryClient.invalidateQueries({
				queryKey: ['map-page-data'],
			});
		},
	});
};
