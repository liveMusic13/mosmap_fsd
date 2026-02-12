import { useQuery } from '@tanstack/react-query';

import { getAreaInfo } from '../api/areaInfo';

export const useGetAreaInfo = (coords: { lat: number; lng: number } | null) => {
	return useQuery({
		queryKey: ['area', 'detail', coords?.lat, coords?.lng],
		queryFn: () => {
			if (!coords) throw new Error('coords is required');
			return getAreaInfo(coords.lat, coords.lng);
		},
		enabled: !!coords,
	});
};
