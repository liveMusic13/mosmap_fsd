import { useQuery } from '@tanstack/react-query';

import { getFilters } from '../api/placeApi';

export const useGetFilters = (mapParam: string) => {
	return useQuery({
		queryKey: ['get-filters-map'],
		queryFn: () => getFilters(mapParam),
		enabled: !!mapParam,
	});
};
