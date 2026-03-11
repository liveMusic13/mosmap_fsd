import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { saveAllFields } from '../api/allFields';

import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';

export const useSaveAllFields = () => {
	const router = useRouter();
	const map = useGetMapForOtherPage();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['save-all-fields'],
		mutationFn: saveAllFields,
		onSuccess: () => {
			router.push(`/?map=${map}`);
			queryClient.invalidateQueries({
				queryKey: ['all-fields'],
			});
		},
	});
};
