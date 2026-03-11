import axios from 'axios';

export const movePass = async (data: {
	password: string;
	oldpassword: string;
	map: string;
}): Promise<{
	map?: string;
	status: string;
	token?: string;
	message?: string;
}> => {
	const response = await axios.post(`/api/settings/map/move-password`, data);

	return response.data;
};
