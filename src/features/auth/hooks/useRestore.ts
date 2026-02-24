import { useMutation } from '@tanstack/react-query';

import { restoreAction } from '../api/authActions';

export const useRestore = () => {
	return useMutation({
		mutationKey: ['restore'],
		mutationFn: restoreAction,
	});
};
