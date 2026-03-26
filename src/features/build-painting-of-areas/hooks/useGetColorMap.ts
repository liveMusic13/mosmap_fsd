import { useQuery } from '@tanstack/react-query';

import { getColorMap } from '../api/color-map';

export const useGetColorMap = (
	mapParam: string,
	sloi: number,
	mode: number,
	field_id: number,
) => {
	return useQuery({
		queryKey: ['color-map', mapParam, sloi, mode, field_id],
		queryFn: () => getColorMap(mapParam, sloi, mode, field_id),
		enabled: false,
		staleTime: Infinity,
	});
};
