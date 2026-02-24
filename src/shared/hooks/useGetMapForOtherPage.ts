import { useSearchParams } from 'next/navigation';

import { buildQueryParams } from '../lib/url';

import { useGetMapPageData } from './api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from './useGetSeoOrQueryParam';

export const useGetMapForOtherPage = () => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const searchParams = useSearchParams();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);

	const { data } = useGetMapPageData(queryString);
	const map = String(data?.map);

	return map;
};
