import { useMutation } from '@tanstack/react-query';

import { saveAllFields } from '../api/allFields';

export const useSaveAllFields = () => {
	return useMutation({
		mutationKey: ['save-all-fields'],
		mutationFn: saveAllFields,
	});
};
