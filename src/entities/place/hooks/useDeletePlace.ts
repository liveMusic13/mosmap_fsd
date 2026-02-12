import { useMutation } from '@tanstack/react-query';

import { deletePlace } from '../api/placeApi';

export const useDeletePlace = () => {
	return useMutation({
		mutationKey: ['delete', 'place'],
		mutationFn: (id: number) => deletePlace(id),
	});
};
