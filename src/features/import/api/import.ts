import axios from 'axios';

export const importLoad = async (data: {
	map: string;
	file: File;
	separator: string;
	encoding: string;
}) => {
	const formData = new FormData();
	formData.append('file', data.file); //HELP: Добавляем файл в FormData
	formData.append('separator', data.separator); //HELP: Добавляем разделитель в FormData
	formData.append('encoding', data.encoding); //HELP: Добавляем кодировку в FormData

	const response = await axios.post(
		`/api/import-load?map=${data.map}`,
		formData,
	);

	return response.data;
};

export const importDone = async (data: {
	map: string;
	data: Record<string, string>;
}): Promise<{ add_rows: number; update_rows: number; read_rows: number }> => {
	const response = await axios.post(
		`/api/import-done?map=${data.map}`,
		data.data,
	);

	return response.data;
};
