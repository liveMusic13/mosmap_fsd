import axios from 'axios';

import { IExportForm, IExportResponse } from '../types';

export type IExportFormRequest = Omit<IExportForm, 'encoding'> & {
	encoding: string;
};

export const exportDone = async (data: {
	map: string;
	data: IExportFormRequest;
}): Promise<IExportResponse> => {
	const params = new URLSearchParams({
		separator: data.data.separator,
		encoding: String(data.data.encoding),
		uploadfile: data.data.uploadfile,
		house_id: String(data.data.house_id),
		addCoordinate: String(data.data.addCoordinate),
	});

	const response = await axios.get(
		`/api/export-done?map=${data.map}&${params}`,
	);

	return response.data;
};
