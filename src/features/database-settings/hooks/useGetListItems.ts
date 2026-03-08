import { useMutation } from '@tanstack/react-query';

import { getListItems } from '../api/additional.api';

export const useGetListItems = () => {
	return useMutation({
		mutationKey: ['get-list-items'],
		mutationFn: getListItems,
	});
};
