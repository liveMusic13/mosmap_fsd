import { useQuery } from '@tanstack/react-query';

import { getAvailabilityZone } from '../api/getAvailabilityZone';

export const useGetAvailabilityZone = ({
	id,
	lat,
	lng,
}: {
	id: number | null;
	lat: number | undefined;
	lng: number | undefined;
}) => {
	return useQuery({
		queryKey: ['get-availability-zone', id, lat, lng],
		queryFn: () => getAvailabilityZone({ id, lat, lng }),
		enabled: !!id || !!(lat && lng),
	});
};
