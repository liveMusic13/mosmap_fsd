import { usePathname, useSearchParams } from 'next/navigation';

import { QUERY_MAP } from '../constants';
import { getPartAfterMap } from '../lib/url';
import { TUrl } from '../types/api.types';

export const useGetSeoOrQueryParam = (): { result: string; type: TUrl } => {
	const searchParams = useSearchParams();
	const map = searchParams.get(QUERY_MAP) || '';

	const pathname = usePathname();
	const seoUrl = getPartAfterMap(pathname);

	if (seoUrl) {
		return { result: seoUrl, type: 'seo' };
	}

	return {
		result: map,
		type: 'query',
	};
};
