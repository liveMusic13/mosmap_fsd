import { IDecodedJWTPayload, IDecodedTokenData } from '../types/shared.type';

/**
 * Декодирует Base64 строку
 */
const decodeBase64 = (str: string): string => {
	try {
		return atob(str);
	} catch (error) {
		console.error('Error decoding base64:', error);
		return '';
	}
};

/**
 * Парсит JSON из Base64 строки
 */
const parseBase64JSON = (base64String: string): IDecodedJWTPayload | null => {
	try {
		const decodedString = decodeBase64(base64String);
		return JSON.parse(decodedString);
	} catch (error) {
		console.error('Error parsing base64 JSON:', error);
		return null;
	}
};

/**
 * Извлекает payload (средняя часть) из JWT токена
 */
const extractJWTPayload = (token: string): string | null => {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) {
			throw new Error('Invalid JWT format');
		}
		return parts[1]; // Средняя часть между точками
	} catch (error) {
		console.error('Error extracting JWT payload:', error);
		return null;
	}
};

/**
 * Расшифровывает JWT токен и возвращает данные
 */
export const decodeJWTToken = (
	token: string | null,
): IDecodedTokenData | null => {
	if (!token) return null;

	try {
		// Извлекаем payload (средняя часть)
		const payload = extractJWTPayload(token);
		if (!payload) {
			throw new Error('Failed to extract JWT payload');
		}

		// Расшифровываем payload из base64
		const decodedPayload = parseBase64JSON(payload);
		if (!decodedPayload) {
			throw new Error('Failed to decode JWT payload');
		}

		// Расшифровываем id и access из base64
		const decodedId = decodeBase64(decodedPayload.id);
		const decodedAccess = decodeBase64(decodedPayload.access);

		// Конвертируем в числа
		const id = parseInt(decodedId, 10);
		const access = parseInt(decodedAccess, 10);

		// Проверяем истечение токена
		const currentTime = Math.floor(Date.now() / 1000);
		const isExpired = decodedPayload.exp < currentTime;

		return {
			id,
			access,
			remote: decodedPayload.remote,
			exp: decodedPayload.exp,
			isExpired,
		};
	} catch (error) {
		console.error('Error decoding JWT token:', error);
		return null;
	}
};

export const checkMapAccess = (
	mapId: number | null,
	token: IDecodedTokenData | null,
): { hasValidToken: boolean; hasMapAccess: boolean } => {
	if (!mapId) {
		return {
			hasValidToken: false,
			hasMapAccess: false,
		};
	}

	if (!token) {
		return {
			hasValidToken: false,
			hasMapAccess: false,
		};
	}

	// Проверяем, не истек ли токен
	const hasValidToken = !token.isExpired;

	if (!hasValidToken) {
		console.warn('Token has expired');
		return {
			hasValidToken: false,
			hasMapAccess: false,
		};
	}

	// Проверяем доступ к конкретной карте
	const hasMapAccess = token.id === mapId;

	return {
		hasValidToken: true,
		hasMapAccess,
	};
};
