import { useQuery } from '@tanstack/react-query';

import { getAllFields } from '../api/allFields';

export const useGetAllFields = () => {
	return useQuery({
		queryKey: ['all-fields'],
		queryFn: getAllFields,
	});
};
