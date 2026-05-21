import axios from 'axios';

import { IObjectOne, IObjectThree, IObjectTwo } from '../types';

export const getAllFields = async (): Promise<
	(IObjectOne | IObjectTwo | IObjectThree)[]
> => {
	const response = await axios.get(`/proxy-api/settings/database`);

	return response.data;
};

export const saveAllFields = async (
	data: (IObjectOne | IObjectTwo | IObjectThree)[],
): Promise<(IObjectOne | IObjectTwo | IObjectThree)[]> => {
	const response = await axios.post(`/proxy-api/settings/database`, data);

	return response.data;
};
