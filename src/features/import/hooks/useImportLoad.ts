import { useMutation } from '@tanstack/react-query';

import { importLoad } from '../api/import';

export const useImportLoad = () => {
	return useMutation({
		mutationKey: ['import-load'],
		mutationFn: (data: {
			map: string;
			file: File;
			separator: string;
			encoding: string;
		}) => importLoad(data),
	});
};
