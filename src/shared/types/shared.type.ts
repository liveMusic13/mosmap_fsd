export interface ISelectOptions {
	name: string;
	value: number;
}

// Интерфейс для расшифрованных данных JWT
export interface IDecodedJWTPayload {
	id: string; // Base64 encoded ID
	access: string; // Base64 encoded access level
	remote: string; // Remote identifier
	exp: number; // Expiration timestamp
}

// Интерфейс для полностью расшифрованных данных
export interface IDecodedTokenData {
	id: number; // Расшифрованный ID карты
	access: number; // Расшифрованный уровень доступа
	remote: string; // Remote identifier
	exp: number; // Expiration timestamp
	isExpired: boolean; // Проверка на истечение токена
}
