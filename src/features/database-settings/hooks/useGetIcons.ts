import { useQuery } from '@tanstack/react-query';

import { getIcons } from '../api/additional.api';

export const useGetIcons = (map: string | undefined) => {
	return useQuery({
		queryKey: ['get-icons', map],
		queryFn: () => {
			if (!map) throw Error('Нету номера карты');
			return getIcons(map);
		},
		enabled: !!map,
	});
};
