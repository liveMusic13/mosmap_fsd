import { useQuery } from '@tanstack/react-query';

import { getDetailsPlace } from '../api/placeApi';

export const useGetDetailsPlace = (id: number | null) => {
	return useQuery({
		queryKey: ['details-place', id],
		queryFn: () => {
			if (id === null || id === undefined) throw new Error('ID is required');
			return getDetailsPlace(id);
		},
		enabled: id !== null && id !== undefined,
	});
};
