import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { loginAction } from '../api/authActions';

interface ISignInParams {
	login: string;
	password: string;
}

export const useSignIn = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ login, password }: ISignInParams) =>
			loginAction(login, password),
		onSuccess: data => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['map-page-data'] });
				router.push('/');
				router.refresh();
			}
		},
		onError: error => console.error(error),
	});
};
