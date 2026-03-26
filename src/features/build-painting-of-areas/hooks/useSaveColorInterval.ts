import { useMutation } from '@tanstack/react-query';

import { saveColorInterval } from '../api/color-interval';
import { IIntervalRange } from '../types';

export const useSaveColorInterval = () => {
	return useMutation({
		mutationKey: ['save-color-interval'],
		mutationFn: (data: { mapParam: string; body: IIntervalRange }) =>
			saveColorInterval(data.mapParam, data.body),
	});
};
