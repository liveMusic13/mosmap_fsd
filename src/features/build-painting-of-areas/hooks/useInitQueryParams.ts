import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { colorIntervalSearchParams } from '../constants';
import { IColorInterval } from '../types';

export const useInitQueryParams = (
	isSuccess: boolean,
	data: IColorInterval | undefined,
	defaultValueSelect: {
		[colorIntervalSearchParams.layerMap]: string;
		[colorIntervalSearchParams.coloringMethod]: string;
		[colorIntervalSearchParams.numberField]: string;
	},
) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const needsUpdateColorParams = useMemo(() => {
		if (!isSuccess || !data) return false;

		const sloiValue = searchParams.get(colorIntervalSearchParams.layerMap);
		const modeValue = searchParams.get(
			colorIntervalSearchParams.coloringMethod,
		);
		const numFieldValue = searchParams.get(
			colorIntervalSearchParams.numberField,
		);

		return !sloiValue || !modeValue || !numFieldValue;
	}, [isSuccess, searchParams, data]);

	useEffect(() => {
		if (needsUpdateColorParams) {
			const params = new URLSearchParams(searchParams.toString());

			if (!searchParams.get(colorIntervalSearchParams.layerMap)) {
				const value = data?.sloi_fields.find(
					el =>
						el.id ===
						Number(defaultValueSelect[colorIntervalSearchParams.layerMap]),
				);
				if (value)
					params.set(colorIntervalSearchParams.layerMap, String(value.id));
			}
			if (!searchParams.get(colorIntervalSearchParams.coloringMethod)) {
				const value = data?.mode_list.find(
					el =>
						el.id ===
						Number(
							defaultValueSelect[colorIntervalSearchParams.coloringMethod],
						),
				);
				if (value)
					params.set(
						colorIntervalSearchParams.coloringMethod,
						String(value.id),
					);
			}
			if (!searchParams.get(colorIntervalSearchParams.numberField)) {
				const value = data?.num_fields.find(
					el =>
						el.id ===
						Number(defaultValueSelect[colorIntervalSearchParams.numberField]),
				);
				if (value)
					params.set(colorIntervalSearchParams.numberField, String(value.id));
			}

			router.replace(`${pathname}?${params.toString()}`);
		}
	}, [isSuccess, data]);
};
