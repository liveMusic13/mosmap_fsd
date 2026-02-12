import { chain } from './proxy/chain';
import { withAuth } from './proxy/proxys/authProxy';
import { withMapQuery } from './proxy/proxys/getMapProxy';
import { withUrlRedirect } from './proxy/proxys/seoUrlProxy';

export default chain([
	withUrlRedirect, // ← проверяем SEO redirect первым
	withMapQuery, // ← потом работаем с query параметрами
	withAuth,
]);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth|images).*)'],
};
