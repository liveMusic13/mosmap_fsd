import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { TOKEN_COOKIE_NAME } from '@/shared/constants';

export async function GET(request: NextRequest) {
	try {
		// Получаем токен из cookies
		const cookieStore = await cookies();
		const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/save_settings.php`,
			{
				headers: {
					'access-token': token,
				},
			},
		);

		return NextResponse.json(response.data);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.response?.status || 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		// Получаем токен из cookies
		const cookieStore = await cookies();
		const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/api/save_settings.php`,
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
		return NextResponse.json(
			{ error: error.message },
			{ status: error.response?.status || 500 },
		);
	}
}
