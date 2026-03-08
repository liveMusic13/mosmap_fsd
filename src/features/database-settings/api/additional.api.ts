import axios from 'axios';

import { IRowAdditional } from '../types';

export const getIcons = async (map: string): Promise<string[]> => {
	const response = await axios.get(
		`/api/settings/database/additional?map=${map}`,
	);

	return response.data;
};

export const getListItems = async (data: {
	map: string;
	idObject: number;
	items?: IRowAdditional[];
}): Promise<IRowAdditional[]> => {
	if (data.items) {
		const response = await axios.post(
			`/api/settings/database/additional?map=${data.map}`,
			{ id: data.idObject, items: data.items },
		);

		return response.data;
	} else {
		const response = await axios.post(
			`/api/settings/database/additional?map=${data.map}`,
			{ id: data.idObject },
		);

		return response.data;
	}
};
