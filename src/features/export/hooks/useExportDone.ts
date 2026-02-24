import { useMutation } from '@tanstack/react-query';

import { IExportFormRequest, exportDone } from '../api/export.api';

export const useExportDone = () => {
	return useMutation({
		mutationKey: ['export-done'],
		mutationFn: (data: { map: string; data: IExportFormRequest }) =>
			exportDone(data),
	});
};
