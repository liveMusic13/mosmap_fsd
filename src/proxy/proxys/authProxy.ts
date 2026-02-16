import { jwtDecode } from 'jwt-decode';
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from 'next/server';

import { TOKEN_COOKIE_NAME } from '@/shared/constants';

//HELP: Приватные маршруты (требуют авторизации)
const protectedRoutes = [
	'/settings',
	//HELP: Добавьте другие защищенные маршруты
];

//HELP: Маршруты только для неавторизованных
const authRoutes = ['/auth', '/register'];

//HELP: Публичные маршруты
const publicRoutes = ['/']; //HELP: ← Главная страница публичная

//HELP: Проверяет начинается ли путь с одного из маршрутов
function matchesRoute(pathname: string, routes: string[]): boolean {
	return routes.some(route => pathname.startsWith(route));
}

//HELP: Проверяет не истек ли токен
function isTokenExpired(token: string): boolean {
	try {
		const decoded: any = jwtDecode(token);
		console.log('decoded', decoded);
		const currentTime = Math.floor(Date.now() / 1000);
		return decoded.exp < currentTime;
	} catch (error) {
		return true; //HELP: Если не можем декодировать - считаем истекшим
	}
}

export function withAuth(middleware: NextMiddleware): NextMiddleware {
	return async (request: NextRequest, event: NextFetchEvent) => {
		const { pathname } = request.nextUrl;
		const token = request.cookies.get(TOKEN_COOKIE_NAME);

		//HELP: Проверяем приватные маршруты
		if (matchesRoute(pathname, protectedRoutes)) {
			//HELP: Нет токена - на авторизацию
			if (!token) {
				console.log('🔴 No token, redirect to /auth');
				return NextResponse.redirect(new URL('/auth', request.url));
			}

			//HELP: Токен истек - удаляем и на авторизацию
			if (isTokenExpired(token.value)) {
				console.log('🔴 Token expired, redirect to /auth');
				const response = NextResponse.redirect(new URL('/auth', request.url));
				response.cookies.delete(TOKEN_COOKIE_NAME);
				return response;
			}

			console.log('✅ Token valid, access granted');
		}

		//HELP: Если уже авторизован - не пускаем на страницу авторизации
		if (matchesRoute(pathname, authRoutes)) {
			if (token && !isTokenExpired(token.value)) {
				console.log('✅ Already authenticated, redirect to Home "/" ');
				return NextResponse.redirect(new URL('/', request.url));
			}

			console.log('⚪ No valid token, allowing access to auth page');
			return middleware(request, event);
		}

		//HELP: 3. Публичные маршруты (доступны всем)
		if (matchesRoute(pathname, publicRoutes)) {
			console.log('⚪ Public route, allowing access');
			return middleware(request, event);
		}

		//HELP: 4. Все остальные
		console.log('⚪ Other route, allowing access');
		return middleware(request, event);
	};
}
