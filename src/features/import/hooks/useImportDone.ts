import { useMutation } from '@tanstack/react-query';

import { importDone } from '../api/import';

export const useImportDone = () => {
	return useMutation({
		mutationKey: ['import-done'],
		mutationFn: (data: { map: string; data: Record<string, string> }) =>
			importDone(data),
	});
};
