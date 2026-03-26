export function keepOnlyFirstHash(str: string): string {
	// Если символа '#' нет вообще, возвращаем строку как есть
	if (!str.includes('#')) {
		return str;
	}

	let result = '';
	let hashFound = false;

	for (const char of str) {
		if (char === '#') {
			if (!hashFound) {
				// Это первый '#', оставляем его и ставим флаг
				result += char;
				hashFound = true;
			}
			// Все последующие '#' просто пропускаем (не добавляем в результат)
		} else {
			// Обычные символы добавляем всегда
			result += char;
		}
	}

	return result;
}
