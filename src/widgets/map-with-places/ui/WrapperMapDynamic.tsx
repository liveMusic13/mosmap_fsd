'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicMapWithPlaces = dynamic(() => import('./MapWithPlaces'), {
	ssr: false,
});

const WrapperMapDynamic: FC = () => {
	return (
		<>
			<div className='flex min-h-0 min-w-0 w-full h-full rounded-xl shadow-custom-black'>
				<DynamicMapWithPlaces />
			</div>
			{/* <div className='sm:hidden flex  min-h-0 min-w-0 w-full h-full rounded-xl shadow-custom-black'>
				<DynamicMapWithPlaces
					key={Math.random()} //HELP: Ставлю ключ для того чтобы при переходе с других страниц карта переобновлялась. Т.к. был такой баг, что какая-то часть карты не отрисовывала тайтл как будто что-то багалось и контейнер карты считал что эта зона вне видимости экрана. И когда работал этот баг с каждым движением карты эта "невидимая" зона становилась все больше и больше пока вообще все маркеры не исчезали. С этим ключом все отлично работает
				/>
			</div> */}
		</>
	);
};

export default WrapperMapDynamic;
