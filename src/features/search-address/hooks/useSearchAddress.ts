import { useQuery } from '@tanstack/react-query';

import { searchAddress } from '../api/searchAdress';

export const useSearchAddress = (address: string | null) => {
	return useQuery({
		queryKey: ['search', 'address', address],
		queryFn: () => {
			if (!address) throw Error('Нет адреса');
			return searchAddress(address);
		},
		enabled: !!address,
	});
};
