import axios from 'axios';

import { IDetailsPlaceInfo } from '../types';

import { IFiltersData } from '@/features/filters-map/types';
import { API_URL } from '@/shared/constants';

export const getDetailsPlace = async (
	id: number,
): Promise<IDetailsPlaceInfo> => {
	const { data } = await axios.get<IDetailsPlaceInfo>(
		`/api/detail-place?id=${id}`,
	);

	return data;
};

export const savePlaceInfo = async (data: {
	queryParams: string;
	place: IDetailsPlaceInfo;
}): Promise<IDetailsPlaceInfo> => {
	const response = await axios.post<IDetailsPlaceInfo>(
		`/api/save-place${data.queryParams}`, // ← Вызываем свой API route
		data.place,
	);

	return response.data;
};
// export const savePlaceInfo = async (data: {
// 	queryParams: string;
// 	place: IDetailsPlaceInfo;
// }): Promise<IDetailsPlaceInfo> => {
// 	const response = await axios.post<IDetailsPlaceInfo>(
// 		`${API_URL}/api/save_object.php${data.queryParams}`,
// 		data.place,
// 		{
// 			withCredentials: true,
// 		},
// 	);

// 	return response.data;
// };

export const deletePlace = async (
	id: number,
): Promise<{ delete: boolean; id: number }> => {
	const response = await axios.get<{ delete: boolean; id: number }>(
		`/api/delete-place?id=${id}`, // ← Вызываем свой API route
	);

	return response.data;
};

export const getFilters = async (mapParam: string): Promise<IFiltersData[]> => {
	const isNumeric = /^\d+$/.test(mapParam);
	if (isNumeric) {
		const { data } = await axios.get(
			`${API_URL}/api/filters.php?map=${mapParam}`,
		);
		return data;
	} else {
		const { data } = await axios.get(
			`${API_URL}/api/filters.php?url=${mapParam}`,
		);
		return data;
	}
};
