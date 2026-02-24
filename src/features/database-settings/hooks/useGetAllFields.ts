import { useQuery } from '@tanstack/react-query';

import { getAllFields } from '../api/getAllFields';

export const useGetAllFields = () => {
	return useQuery({
		queryKey: ['all-fields'],
		queryFn: getAllFields,
	});
};
