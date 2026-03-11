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
	try {
		const { data } = await axios.get<IMapPageData>(
			`${API_URL}/api/get_objects.php${queryParams}`,
		);
		// const { points, ...restData } = data;

		// console.log('test:', restData, 'queryParams: ', queryParams);

		return data;
	} catch (error) {
		return {
			title: 'MosMap-Marker. Программное обеспечение для геоаналитики',
			tiles_url: 'https://www.moscowmap.ru/leaflet/tiles/{z}/{x}/{y}.png',
			description: 'MosMap-Marker. Программное обеспечение для геоаналитики',
			'all-points': 0,
			bounds: '[[null, null], [null, null]]',
			clastering: '0',
			canvas_map: 0,
			map: 0,
			icons_ref: '',
			color_ref: '',
			icons: {
				null: 'null',
			},
			colors: {
				color: '',
			},
			url: '',
			buttons: [],
			icons_size: {},
			points: [],
			zoom_max: 13,
			zoom_min: 0,
			isClear: true,
		};
	}
};
