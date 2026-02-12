// withMapQuery (getMapProxy.ts)
import { NextMiddleware, NextResponse } from 'next/server';

import { QUERY_MAP, USER_MAP_SERVER_COOKIE } from '@/shared/constants';

export function withMapQuery(middleware: NextMiddleware): NextMiddleware {
	return async (request, event) => {
		const { searchParams, pathname } = request.nextUrl;

		const hasMapParam = searchParams.has(QUERY_MAP);

		// 👉 если map есть в URL — кладём в cookie
		if (hasMapParam) {
			const queryParamMap = searchParams.get(QUERY_MAP);

			if (queryParamMap) {
				console.log('✅ Setting cookie from query:', queryParamMap);

				const response = NextResponse.next();

				response.cookies.set(USER_MAP_SERVER_COOKIE, queryParamMap, {
					path: '/',
					httpOnly: false,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
				});

				// Продолжаем без редиректа
				// (withUrlRedirect уже сделал редирект на SEO URL если нужно)
				return response;
			}
		}

		// 👉 если map НЕТ в URL, но есть cookie
		const mapCookie = request.cookies.get(USER_MAP_SERVER_COOKIE);

		// ВАЖНО: добавляем ?map= только если мы НЕ на SEO URL
		// SEO URL имеет формат /map/something
		const isOnSeoUrl = pathname.startsWith('/map/');

		if (!hasMapParam && mapCookie?.value && !isOnSeoUrl) {
			const url = request.nextUrl.clone();
			url.searchParams.set(QUERY_MAP, mapCookie.value);

			console.log('🗺 Adding map param from cookie:', mapCookie.value);

			return NextResponse.redirect(url);
		}

		return middleware(request, event);
	};
}
