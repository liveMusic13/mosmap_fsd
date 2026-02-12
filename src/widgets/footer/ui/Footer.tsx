import { HStack, VStack } from '@/shared/ui/box';
import Line from '@/shared/ui/Line';
import Link from 'next/link';
import { FC } from 'react';
import { arrMenuFooter } from '../data/menu';

const Footer: FC = () => {
	return (
		<footer className='h-16 sm:h-17 md:h-18 lg:h-21 xl:h-22 w-full bg-primary px-2.5 sm:px-5 md:px-7.5 xl:px-15 py-2'>
			<VStack>
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
					<HStack className='gap-4 sm:gap-5 md:gap-6 '>
						{arrMenuFooter.map(el => (
							<Link
								key={el.id}
								href={el.link ? el.link : ''}
								className='font-semibold text-white text-[1rem] sm:text-xs hover:text-text-black transition-colors'
							>
								{el.title}
							</Link>
						))}
					</HStack>
					<div className='flex flex-col items-end gap-0.5'>
						<a
							href='tel:+74955326373'
							className='font-semibold text-white text-[1rem] sm:text-xs  hover:text-text-black transition-colors'
						>
							+7(495)532-6373
						</a>
						<a
							href='mailto:mosmap@mosmap.ru'
							className='font-semibold text-white text-[1rem] sm:text-xs  hover:text-text-black transition-colors'
						>
							mosmap@mosmap.ru
						</a>
					</div>
				</div>
				<div className='bg-line-footer w-full h-px' />
				<div className='flex items-center justify-between pt-1 text-xs gap-2'>
					<p className='text-copyright'>Copyright © 2023 - ООО "МСМП"</p>
					<p className='text-copyright'>Политика конфиденциальности</p>
				</div>
			</VStack>
		</footer>
	);
};

export default Footer;
