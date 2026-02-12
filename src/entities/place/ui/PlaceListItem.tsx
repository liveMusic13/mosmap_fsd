'use client';

import Image from 'next/image';
import { FC } from 'react';

import { IPlace } from '../types';

import Button from '@/shared/ui/Button';

interface IProps {
	place: IPlace;
	isTarget: boolean;
	onClick: () => void;
}

//TODO: Подумать как для первого элемента списка отобразить тултип. Потому что сейчас его не видно просто. а ЕСЛИ СДЕЛАТЬ ЧТОБЫ ДЛЯ НЕГО ОН СНИЗУ ОТОБРАЖАЛСЯ, ТО ЕГО ПЕРЕКРЫВАЕТ СЛЕДУЮЩИЙ ПО СПИСКУ ИТЕМ, ТАК КАК СКОРЕЕ ВСЕГО БИБЛИОТЕКА ВИРТУАЛИЗАЦИИ ТАК НАСТРОЕНА ЧТОБЫ ПЕРЕКРЫВАТЬ.
export const PlaceListItem: FC<IProps> = ({ place, isTarget, onClick }) => {
	return (
		<div
			className={`relative border-b border-dotted border-border-dotted h-12 w-full flex items-center justify-between group hover:cursor-pointer ${isTarget ? 'bg-light-blue' : ''}`}
			onClick={onClick}
		>
			<span className='truncate whitespace-nowrap text-xs xl:text-sm font-semibold text-primary'>
				{place.name}
			</span>
			<Button variant='icon' className='bg-transparent'>
				<Image
					src={
						place.crd === null
							? '/images/icons/no_coords.svg'
							: '/images/icons/target.svg'
					}
					alt='logo'
					width={20} //HELP: минимальный размер для оптимизации
					height={20} //HELP: должен быть в тех же пропорциях, что и изображение
				/>
			</Button>
			<p
				className={`opacity-0 py-1 px-1.5 rounded-lg group-hover:opacity-100 transition-opacity absolute bottom-[110%] pointer-events-none left-0 bg-white text-primary shadow-custom-black`}
			>
				{place.name}
			</p>
		</div>
	);
};
