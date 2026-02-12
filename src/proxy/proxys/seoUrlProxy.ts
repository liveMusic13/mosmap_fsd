import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';

import { getMapPageData } from '@/shared/api/getMapPageData';
import { QUERY_MAP, USER_MAP_SERVER_COOKIE } from '@/shared/constants';
import { buildQueryParams } from '@/shared/lib/url';

export function withUrlRedirect(middleware: NextMiddleware): NextMiddleware {
	return async (request: NextRequest, event: NextFetchEvent) => {
		console.log('🔍 withUrlRedirect triggered');

		const { searchParams, pathname } = request.nextUrl;

		// Читаем map из URL или cookie
		const mapFromUrl = searchParams.get(QUERY_MAP);
		const mapFromCookie = request.cookies.get(USER_MAP_SERVER_COOKIE)?.value;
		const map = mapFromUrl || mapFromCookie;

		console.log('🗺 server map:', map, 'path:', pathname);

		// Если нет map — пропускаем
		if (!map) {
			console.log('⚪ No map, skipping redirect check');
			return middleware(request, event);
		}

		try {
			console.log('📡 Fetching map data for:', map);
			const queryParams = buildQueryParams('query', searchParams, map);
			const dataMap = await getMapPageData(queryParams);
			console.log('📦 dataMap:', dataMap.title, dataMap.url, dataMap.map);

			if (dataMap?.url) {
				const expectedPath = `/map/${dataMap.url}`;

				if (pathname !== expectedPath) {
					const seoUrl = request.nextUrl.clone();
					seoUrl.pathname = expectedPath;
					seoUrl.searchParams.delete(QUERY_MAP);

					return NextResponse.redirect(seoUrl, 301);
				}

				return middleware(request, event);
			}

			console.log('⚪ No url in dataMap, continuing...');
			return middleware(request, event);
		} catch (error) {
			console.error('❌ server error:', error);
			return middleware(request, event);
		}
	};
}
