import axios from 'axios';

import { ISettingsMap } from '../types';

export const getSettingsMap = async (): Promise<ISettingsMap> => {
	const response = await axios.get(`/api/settings/map`);

	return response.data;
};

export const saveAllFields = async (
	data: Omit<ISettingsMap, 'save_status'>,
): Promise<ISettingsMap> => {
	const response = await axios.post(`/api/settings/map`, data);

	return response.data;
};
