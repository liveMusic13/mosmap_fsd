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
		const { searchParams, pathname } = request.nextUrl;

		if (
			pathname.startsWith('/mobile-filters') ||
			pathname.startsWith('/map/') ||
			pathname.startsWith('/mobile-list') ||
			pathname.startsWith('/import') ||
			pathname.startsWith('/export') ||
			pathname.startsWith('/registr') ||
			pathname.startsWith('/auth') ||
			pathname.startsWith('/confirm') ||
			pathname.startsWith('/settings-database') ||
			pathname.startsWith('/settings-map') ||
			pathname.startsWith('/mobile-painting-of-area')
		) {
			// Если мы уже на SEO URL, не нужно пытаться делать редирект на основе куки!
			// Иначе кука со старым ID будет всегда откатывать нас назад.
			return middleware(request, event);
		}

		const mapFromUrl = searchParams.get(QUERY_MAP);
		// Берем из куки ТОЛЬКО если мы на главной или другом не-SEO пути
		const mapFromCookie = request.cookies.get(USER_MAP_SERVER_COOKIE)?.value;
		const map = mapFromUrl || mapFromCookie;

		if (!map) return middleware(request, event);

		try {
			const queryParams = buildQueryParams('query', searchParams, map);
			const dataMap = await getMapPageData(queryParams);

			if (dataMap?.url) {
				const expectedPath = `/map/${dataMap.url}`;
				if (pathname !== expectedPath) {
					const seoUrl = request.nextUrl.clone();
					seoUrl.pathname = expectedPath;
					seoUrl.searchParams.delete(QUERY_MAP);

					const response = NextResponse.redirect(seoUrl, 301);
					// Синхронизируем куку, чтобы в ней лежал ID той карты, на которую ушли
					response.cookies.set(USER_MAP_SERVER_COOKIE, map, { path: '/' });
					return response;
				}
			}
			return middleware(request, event);
		} catch (error) {
			return middleware(request, event);
		}
	};
}

// export function withUrlRedirect(middleware: NextMiddleware): NextMiddleware {
// 	return async (request: NextRequest, event: NextFetchEvent) => {
// 		console.log('🔍 withUrlRedirect triggered');

// 		const { searchParams, pathname } = request.nextUrl;

// 		// ✅ ВАЖНО: исключаем mobile-filters
// 		if (
// 			pathname.startsWith('/mobile-filters') ||
// 			pathname.startsWith('/mobile-list') ||
// 			pathname.startsWith('/import')
// 		) {
// 			return middleware(request, event);
// 		}

// 		// Читаем map из URL или cookie
// 		const mapFromUrl = searchParams.get(QUERY_MAP);
// 		const mapFromCookie = request.cookies.get(USER_MAP_SERVER_COOKIE)?.value;
// 		const map = mapFromUrl || mapFromCookie;

// 		console.log('🗺 server map:', map, 'path:', pathname);

// 		// Если нет map — пропускаем
// 		if (!map) {
// 			console.log('⚪ No map, skipping redirect check');
// 			return middleware(request, event);
// 		}

// 		try {
// 			console.log('📡 Fetching map data for:', map);
// 			const queryParams = buildQueryParams('query', searchParams, map);
// 			const dataMap = await getMapPageData(queryParams);
// 			console.log('📦 dataMap:', dataMap.title, dataMap.url, dataMap.map);

// 			// if (dataMap?.url) {
// 			// 	const expectedPath = `/map/${dataMap.url}`;

// 			// 	if (pathname !== expectedPath) {
// 			// 		const seoUrl = request.nextUrl.clone();
// 			// 		seoUrl.pathname = expectedPath;
// 			// 		seoUrl.searchParams.delete(QUERY_MAP);

// 			// 		// Логирование для отладки
// 			// 		console.log('🔄 Redirect:', {
// 			// 			from: pathname,
// 			// 			to: expectedPath,
// 			// 			params: seoUrl.search,
// 			// 		});

// 			// 		return NextResponse.redirect(seoUrl, 301);
// 			// 	}

// 			// 	return middleware(request, event);
// 			// }

// 			// Внутри withUrlRedirect, где dataMap?.url существует:
// 			if (dataMap?.url) {
// 				const expectedPath = `/map/${dataMap.url}`;

// 				if (pathname !== expectedPath) {
// 					const seoUrl = request.nextUrl.clone();
// 					seoUrl.pathname = expectedPath;
// 					seoUrl.searchParams.delete(QUERY_MAP);

// 					const response = NextResponse.redirect(seoUrl, 301);

// 					// ✅ СИНХРОНИЗИРУЕМ КУКУ:
// 					// Чтобы кука всегда соответствовала тому, что сейчас в SEO URL
// 					response.cookies.set(USER_MAP_SERVER_COOKIE, map, {
// 						path: '/',
// 						httpOnly: false,
// 						sameSite: 'lax',
// 					});

// 					console.log('🔄 SEO Redirect + Cookie Sync:', dataMap.url);
// 					return response;
// 				}
// 			}

// 			console.log('⚪ No url in dataMap, continuing...');
// 			return middleware(request, event);
// 		} catch (error) {
// 			console.error('❌ server error:', error);
// 			return middleware(request, event);
// 		}
// 	};
// }
