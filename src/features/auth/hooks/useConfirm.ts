import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { confirmAction } from '../api/authActions';

export const useConfirm = () => {
	const router = useRouter();

	return useMutation({
		mutationKey: ['confirm'],
		mutationFn: confirmAction,
		onSuccess: data => {
			if (data.status === 'OK') {
				router.push(`/?map=${data.map}`);
			}
		},
	});
};
