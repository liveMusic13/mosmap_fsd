import axios from 'axios';

import type { IMapPageData } from '../types/api.types';

import { API_URL } from '@/shared/constants';

//TODO: переписать доку
/**
 *
 * @param mapParam - аргумент в виде строки. Он может быть как цифрой из query параметра так и строкой из seo url
 * @returns возвращает данные по карте
 */
export const getMapPageData = async (
	queryParams: string,
): Promise<IMapPageData> => {
	const { data } = await axios.get<IMapPageData>(
		`${API_URL}/api/get_objects.php${queryParams}`,
	);

	return data;
};
