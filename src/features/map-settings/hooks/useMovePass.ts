import { useMutation } from '@tanstack/react-query';

import { movePass } from '../api/movePass';

export const useMovePass = () => {
	return useMutation({
		mutationKey: ['move-pass', 'settings-map'],
		mutationFn: movePass,
	});
};
