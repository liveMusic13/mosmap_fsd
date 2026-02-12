'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

import Burger from './Burger';
import Menu from './Menu';
import Line from '@/shared/ui/Line';

const Header: FC = () => {
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());
	const paramsToString = new URLSearchParams(params).toString();

	//TODO:сделать потом нормальный функционал для бургер меню
	const [test, setTest] = useState(false);

	return (
		<header
			style={{ backgroundImage: "url('/images/header_image.png')" }}
			className='bg-cover bg-center bg-no-repeat w-full h-10 sm:h-16 md:h-18 lg:h-19 xl:h-20 flex items-center justify-between px-2.5 sm:px-5 md:px-7.5 xl:px-15'
		>
			<div className='flex items-center lg:gap-4 xl:gap-6'>
				<Burger isOpen={test} handleClick={() => setTest(!test)} />
				<Link href={`/?${paramsToString}`}>
					<Image
						src={'/images/icons/logo.svg'}
						alt='logo'
						width={178} //HELP: минимальный размер для оптимизации
						height={39} //HELP: должен быть в тех же пропорциях, что и изображение
						priority={true} //HELP: чтобы первым отрисовывалось
						className='-mb-1 sm:-mb-2.5 w-32 sm:w-44.5'
					/>
				</Link>
				<Line className='hidden lg:block' />
				<h1 className='hidden lg:inline font-black uppercase'>геоаналитика</h1>
			</div>
			<div className='hidden sm:block'>
				<Menu position='horizontal' />
			</div>
		</header>
	);
};

export default Header;
