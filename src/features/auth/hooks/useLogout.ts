'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { logoutAction } from '../api/authActions';

export const useLogout = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: () => logoutAction(),
		onSuccess: () => {
			router.push('/auth');
			router.refresh();
		},
		onError: error => {
			console.error('Logout error:', error);
		},
	});
};
