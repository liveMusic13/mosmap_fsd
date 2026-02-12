import { type Control, useWatch } from 'react-hook-form';

import { colorIntervalSearchParams } from '../constants';
import type { IFormColorInterval } from '../types';

export const useIsViewNumField = (control: Control<IFormColorInterval>) => {
	const coloringMethod = useWatch({
		control,
		name: colorIntervalSearchParams.coloringMethod,
	});

	return coloringMethod != '0' && !!coloringMethod;
};
