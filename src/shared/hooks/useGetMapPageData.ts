import { useQuery } from '@tanstack/react-query';

import { getMapPageData } from '../api/getMapPageData';

export const useGetMapPageData = (mapParam: string | undefined) => {
	return useQuery({
		queryKey: ['map-page-data'],
		queryFn: () => getMapPageData(mapParam!),
		enabled: !!mapParam,
	});
};
