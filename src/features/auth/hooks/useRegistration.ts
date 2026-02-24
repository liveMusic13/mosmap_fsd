import { useMutation } from '@tanstack/react-query';

import { registrationAction } from '../api/authActions';

export const useRegistration = () => {
	return useMutation({
		mutationKey: ['registration'],
		mutationFn: registrationAction,
	});
};
