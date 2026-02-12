import { useQuery } from '@tanstack/react-query';

import { getMapPageData } from '@/shared/api/getMapPageData';

export const useGetMapPageData = (queryParams: string | undefined | null) => {
	return useQuery({
		queryKey: ['map-page-data'],
		queryFn: () => getMapPageData(queryParams!),
		enabled: !!queryParams,
	});
};
