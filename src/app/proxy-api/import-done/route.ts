import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { TOKEN_COOKIE_NAME } from '@/shared/constants';

export async function POST(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const queryString = searchParams.toString();

		// Получаем данные как JSON
		const body = await request.json();

		// 2. Получаем токен
		const cookieStore = await cookies();
		const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

		// 3. Отправляем запрос на бэкенд
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/api/import_done.php?${queryString}`,
			body,
			{
				headers: {
					'access-token': token,
					'Content-Type': 'application/json',
				},
			},
		);

		return NextResponse.json(response.data);
	} catch (error: any) {
		console.error('Import Proxy Error:', error.response?.data || error.message);
		return NextResponse.json(
			{ error: error.response?.data || error.message },
			{ status: error.response?.status || 500 },
		);
	}
}
