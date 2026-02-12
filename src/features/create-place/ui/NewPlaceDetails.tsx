import { FC, useLayoutEffect } from 'react';

import { EditPlaceDetail } from '@/entities/place';
import { useGetDetailsPlace } from '@/entities/place/hooks/useGetDetailsPlace';
import { useGetFilters } from '@/entities/place/hooks/useGetFilters';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { Loader } from '@/shared/ui/loader/Loader';

export const NewPlaceDetails: FC = () => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const { data: data_filters } = useGetFilters(mapOrSeoUrl.result);
	const setTargetPlaceId = useTargetPlaceIdStore(store => store.setTargetId);
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);

	useLayoutEffect(() => setTargetPlaceId(0), []);

	const { isLoading, data, isError, error } = useGetDetailsPlace(targetPlaceId);

	return (
		<div className='flex flex-col gap-2 min-h-0 flex-1 overflow-auto scrollbar-custom'>
			{isLoading && <Loader />}
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
