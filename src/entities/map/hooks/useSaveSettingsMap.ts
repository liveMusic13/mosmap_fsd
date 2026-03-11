import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { saveAllFields } from '../api/settingsMap';

import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';

export const useSaveSettingsMap = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const mapOrSeoUrl = useGetSeoOrQueryParam();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { refetch } = useGetMapPageData(queryString);

	return useMutation({
		mutationKey: ['save-settings-map'],
		mutationFn: saveAllFields,
		onSuccess: data => {
			if (data.save_status === 'OK') {
				queryClient.invalidateQueries({
					queryKey: ['settings-map'],
				});
				refetch();
				router.push('/');
			}
		},
	});
};
