import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { EditPlaceDetail } from '@/entities/place';
import { useGetDetailsPlace } from '@/entities/place/hooks/useGetDetailsPlace';
import { useGetFilters } from '@/entities/place/hooks/useGetFilters';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';

export const EditPlaceDetails: FC = () => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const { data, isError, error } = useGetDetailsPlace(targetPlaceId);

	const { reset } = useFormContext();

	const { data: data_filters } = useGetFilters(mapOrSeoUrl.result);

	useEffect(() => {
		if (!data?.values || typeof data === 'string') return;

		const defaults = Object.fromEntries(
			data.values.map(v => {
				if (v.el === 'input') {
					return [v.label, v.value];
				} else {
					return [v.label, v.id];
				}
			}),
		);

		reset(defaults);
	}, [data, reset]);

	return (
		<div className='flex flex-col gap-2 min-h-0 flex-1 overflow-auto scrollbar-custom'>
			{isError && <div>{error.message}</div>}
			{data?.values.map((info, ind) => {
				const optionsSelect =
					data_filters?.find(filter => filter.name === info.name)?.items || [];

				return (
					<EditPlaceDetail
						key={`${info.value}${ind}`}
						title={info.label}
						value={info.value}
						el={info.el}
						options={optionsSelect}
					/>
				);
			})}
		</div>
	);
};
