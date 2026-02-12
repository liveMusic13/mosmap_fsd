import { FC } from 'react';

import { IPlaceDetail } from '../../types';

export const PlaceDetail: FC<IPlaceDetail> = ({ title, value }) => {
	return (
		<div className='flex flex-col gap-1.5'>
			<h3 className='font-bold'>{title}</h3>
			<p className='font-medium border border-border-input-gray px-2 py-1 xl:px-4 xl:py-2 rounded-sm text-primary text-xs xl:text-sm'>
				{value || 'Нету данных'}
			</p>
		</div>
	);
};
