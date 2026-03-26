import { useSearchParams } from 'next/navigation';

import { colorIntervalSearchParams } from '../constants';

export const useGetIntervalSearchParams = () => {
	const searchParams = useSearchParams();

	const sloi = Number(searchParams.get(colorIntervalSearchParams.layerMap));
	const type = Number(
		searchParams.get(colorIntervalSearchParams.coloringMethod),
	);
	const fieldId = Number(
		searchParams.get(colorIntervalSearchParams.numberField),
	);

	return {
		sloi,
		type,
		fieldId,
		searchParams,
	};
};
