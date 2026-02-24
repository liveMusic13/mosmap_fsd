import { useMutation } from '@tanstack/react-query';

import { newpass } from '../api/authActions';

export const useNewPass = () => {
	return useMutation({
		mutationKey: ['newpass'],
		mutationFn: newpass,
	});
};
