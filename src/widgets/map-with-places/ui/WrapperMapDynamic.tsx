'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicMapWithPlaces = dynamic(() => import('./MapWithPlaces'), {
	ssr: false,
});

const WrapperMapDynamic: FC = () => {
	return (
		<div className='flex min-h-0 min-w-0 w-full h-full rounded-xl shadow-custom-black'>
			<DynamicMapWithPlaces />
		</div>
	);
};

export default WrapperMapDynamic;
