import axios from 'axios';

import { ISearchAddress } from '../types';

export const searchAddress = async (
	address: string,
): Promise<{ list: ISearchAddress[] }> => {
	const { data } = await axios.get<{ list: ISearchAddress[] }>(
		//TODO: ОБЯЗАТЕЛЬНО!! Перед тем как сдавать работу, поменять обратно на переменную API_URL
		`https://mosmap.ru/api/adres_response.php?term=${address}`,
		// `${API_URL}/api/adres_response.php?term=${address}`,
	);

	return data;
};
