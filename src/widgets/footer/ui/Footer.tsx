'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import { arrMenuFooter } from '../data/menu';

import Line from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/box';

const Footer: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<footer className='w-full bg-primary px-2.5 sm:px-4 xl:px-15 pt-2 sm:h-17 md:h-18 lg:h-18 xl:h-22'>
			<VStack>
				{/*HELP: Кликабельный заголовок (только на мобильных) */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className='flex sm:hidden items-center justify-between w-full pb-1.5'
					type='button'
				>
					<HStack className='gap-2'>
						<h2 className='uppercase text-white text-2xl'>mosmap</h2>
					</HStack>
					<svg
						className={`w-5 h-5 text-white transition-transform duration-300 ${
							isOpen ? 'rotate-180' : ''
						}`}
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</button>

				{/*HELP: Десктоп версия */}
				<div className='hidden sm:block w-full'>
					<div className='flex items-center justify-between w-full pb-1.5'>
						<HStack className='gap-2 sm:gap-3'>
							<h2 className='uppercase text-white text-2xl xl:text-3xl'>
								mosmap
							</h2>
							<Line className='bg-white h-6! xl:h-9 hidden [@media(min-width:765px)_and_(max-width:896px)]:hidden md:block' />
							<h2 className='text-xs xl:text-lg text-white uppercase hidden [@media(min-width:765px)_and_(max-width:896px)]:hidden md:inline'>
								геоаналитика
							</h2>
						</HStack>
						<FooterContent />
					</div>
					<div className='bg-line-footer w-full h-px' />
					<FooterCopyright />
				</div>

				{/*HELP: Мобильная версия с анимацией */}
				<div
					className={`sm:hidden grid transition-all duration-300 ease-in-out ${
						isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
					}`}
				>
					<div className='overflow-hidden'>
						<div className='pt-2'>
							<FooterContent />
							<div className='bg-line-footer w-full h-px my-2' />
							<FooterCopyright />
						</div>
					</div>
				</div>
			</VStack>
		</footer>
	);
};

//HELP: Вспомогательные компоненты для избежания дублирования
const FooterContent = () => (
	<div className='flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center gap-3 sm:gap-5 md:gap-6'>
		<div className='flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-5 md:gap-6'>
			{arrMenuFooter.map(el => (
				<Link
					key={el.id}
					href={el.link ? el.link : ''}
					className='font-semibold text-white text-[1rem] sm:text-xs hover:text-text-black transition-colors'
				>
					{el.title}
				</Link>
			))}
		</div>
		<div className='flex flex-col sm:items-end gap-0.5'>
			<a
				href='tel:+74955326373'
				className='font-semibold text-white text-[1rem] sm:text-xs hover:text-text-black transition-colors'
			>
				+7(495)532-6373
			</a>
			<a
				href='mailto:mosmap@mosmap.ru'
				className='font-semibold text-white text-[1rem] sm:text-xs hover:text-text-black transition-colors'
			>
				mosmap@mosmap.ru
			</a>
		</div>
	</div>
);

const FooterCopyright = () => (
	<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between pt-1 text-xs gap-0.5 sm:gap-2'>
		<p className='text-copyright'>Copyright © 2023 - ООО "МСМП"</p>
		<p className='text-copyright'>Политика конфиденциальности</p>
	</div>
);

export default Footer;
