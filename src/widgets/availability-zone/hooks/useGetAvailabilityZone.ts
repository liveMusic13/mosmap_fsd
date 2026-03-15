import { useQuery } from '@tanstack/react-query';

import { getAvailabilityZone } from '../api/getAvailabilityZone';

export const useGetAvailabilityZone = ({
	id,
	lat,
	lng,
	isViewAvailabilityZone,
}: {
	id: number | null;
	lat: number | undefined;
	lng: number | undefined;
	isViewAvailabilityZone: boolean;
}) => {
	return useQuery({
		queryKey: ['get-availability-zone', id, lat, lng],
		queryFn: () => getAvailabilityZone({ id, lat, lng }),
		enabled: !!id || !!(lat && lng) || isViewAvailabilityZone,
	});
};
