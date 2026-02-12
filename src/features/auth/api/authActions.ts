'use server';

import {
	API_URL,
	TOKEN_COOKIE_NAME,
	USER_MAP_SERVER_COOKIE,
} from '@/shared/constants';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function loginAction(login: string, password: string) {
	try {
		console.log('🔵 Login attempt:', { login, apiUrl: API_URL });

		const { data, status } = await axios.post<{
			access_token: string;
			user: string;
		}>(`${API_URL}/api/get_token.php`, {
			login,
			password,
		});

		console.log('🟢 Response status:', status);
		console.log('🟢 Response data:', JSON.stringify(data, null, 2));

		// Проверяем разные варианты названия поля с токеном
		const token = data.access_token;

		if (token) {
			const cookieStore = await cookies();

			cookieStore.set(TOKEN_COOKIE_NAME, token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24,
				path: '/',
			});
			console.log('✅ Token saved to cookie');

			cookieStore.set(USER_MAP_SERVER_COOKIE, data.user, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24,
				path: '/',
			});
			console.log('✅ User map saved to cookie');

			return { success: true };
		}

		console.log('❌ No token in response');
		return {
			success: false,
			error: 'Токен не найден в ответе сервера',
			responseData: data, // Отправляем данные для отладки
		};
	} catch (error) {
		console.error('🔴 Login error:', error);

		if (axios.isAxiosError(error)) {
			console.log('🔴 Error response:', error.response?.data);
			console.log('🔴 Error status:', error.response?.status);

			return {
				success: false,
				error:
					error.response?.data?.message ||
					error.response?.data?.error ||
					`Ошибка ${error.response?.status}: ${error.message}`,
				responseData: error.response?.data,
			};
		}

		return {
			success: false,
			error: 'Ошибка сети',
			errorMessage: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

export const logoutAction = async () => {
	const cookieStore = await cookies();
	cookieStore.delete(TOKEN_COOKIE_NAME);
	return { success: true };
};
