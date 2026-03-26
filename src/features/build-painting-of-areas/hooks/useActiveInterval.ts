import { useMemo } from 'react';

import { IIntervalRange } from '../types';

import { useGetIntervalSearchParams } from './useGetIntervalSearchParams';

export const useActiveInterval = (
	intervals: IIntervalRange[] | undefined,
): IIntervalRange | undefined => {
	// const searchParams = useSearchParams();
	const { fieldId, sloi, type, searchParams } = useGetIntervalSearchParams();

	return useMemo(() => {
		if (!intervals?.length) return undefined;
		// console.log(
		// 	'intervals',
		// 	intervals,
		// 	intervals.find(
		// 		interval =>
		// 			interval.sloi === sloi &&
		// 			interval.type === type &&
		// 			interval.field_id === fieldId,
		// 	),
		// );

		// const sloi = Number(searchParams.get(colorIntervalSearchParams.layerMap));
		// const type = Number(
		// 	searchParams.get(colorIntervalSearchParams.coloringMethod),
		// );
		// const fieldId = Number(
		// 	searchParams.get(colorIntervalSearchParams.numberField),
		// );

		return intervals.find(
			interval =>
				interval.sloi === sloi &&
				interval.type === type &&
				interval.field_id === fieldId,
		);
	}, [intervals, searchParams]);
};
