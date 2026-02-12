import { FC } from 'react';

import { PlaceDetail } from '@/entities/place';
import { useGetDetailsPlace } from '@/entities/place/hooks/useGetDetailsPlace';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';

export const PlaceDetails: FC = () => {
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const { data, isError, error } = useGetDetailsPlace(targetPlaceId);

	return (
		<div className='flex flex-col gap-2 min-h-0 flex-1 overflow-auto scrollbar-custom'>
			{isError && <div>{error.message}</div>}
			{data?.values.map((info, ind) => (
				<PlaceDetail
					key={`${info.value}${ind}`}
					title={info.label}
					value={info.value}
				/>
			))}
		</div>
	);
};
