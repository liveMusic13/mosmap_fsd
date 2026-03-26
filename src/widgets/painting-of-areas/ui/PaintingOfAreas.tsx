import { FC } from 'react';

import { WrapperPaintingOfAreas } from '@/features/build-painting-of-areas';

export const PaintingOfAreas: FC = () => {
	return (
		// <div className='bg-white shadow-custom-black min-w-56 xl:min-w-sm rounded-xl py-3 px-2 xl:py-5 xl:px-4 flex flex-col gap-3 h-full min-h-0'>
		<div className='bg-white shadow-custom-black min-w-69 xl:min-w-sm rounded-xl py-3 px-2 xl:py-5 xl:px-4 flex flex-col gap-3 h-full min-h-0'>
			<h3 className='font-bold text-xl xl:text-[1.38rem] mb-2.5'>
				Закрасить районы
			</h3>

			<WrapperPaintingOfAreas />
		</div>
	);
};
