import { useQuery } from '@tanstack/react-query';

import { getColorInterval } from '../api/color-interval';

export const useGetColorInterval = (map: string | null) => {
	return useQuery({
		queryKey: ['color-interval', map],
		queryFn: () => {
			if (!map) throw Error('Нету данных карты');
			return getColorInterval(map);
		},
	});
};
