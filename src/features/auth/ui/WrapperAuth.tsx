'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { SUBTITLES_AUTH, TITLES_AUTH } from '../constants';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { HStack, VStack } from '@/shared/ui/box';

interface IAuthComponentProps {
	title: string;
}
type TPathKey = keyof typeof PATHNAME_COMPONENT;

const PATHNAME_COMPONENT: Record<string, FC<IAuthComponentProps>> = {
	auth: SignIn,
	registr: SignUp,
} as const;

export const WrapperAuth: FC = () => {
	const pathname = usePathname();
	const key = pathname.substring(1) as string;

	const title =
		pathname === '/auth'
			? TITLES_AUTH.auth
			: pathname === '/registr'
				? TITLES_AUTH.registration
				: pathname === '/restore'
					? TITLES_AUTH.restore
					: '';

	const href =
		title === TITLES_AUTH.auth
			? '/registr'
			: title === TITLES_AUTH.registration
				? '/restore'
				: title === TITLES_AUTH.restore
					? '/registr'
					: '';
	const subTitleTop =
		title === TITLES_AUTH.auth
			? SUBTITLES_AUTH.registration
			: title === TITLES_AUTH.registration
				? SUBTITLES_AUTH.restore
				: title === TITLES_AUTH.restore
					? SUBTITLES_AUTH.registration
					: '';

	const ComponentForm = PATHNAME_COMPONENT[key as TPathKey];

	if (!Object.keys(PATHNAME_COMPONENT).includes(key)) {
		return <div>Страница не найдена</div>;
	}

	return (
		<div className='flex flex-col flex-1'>
			<h1 className='font-black font-intro my-3.5 ml-2.5 sm:ml-5 md:ml-7.5 xl:ml-15 uppercase text-3xl xl:text-4xl'>
				{title}
			</h1>
			<div className='flex items-center justify-center flex-col flex-1'>
				<VStack className='bg-white rounded-xl shadow-custom-green pt-7.5 px-10 pb-10 max-h-[70vh]'>
					<HStack className='border-b border-dotted border-b-border-dotted pb-5 xl:pb-7 justify-between gap-32 xl:gap-36'>
						<h2 className='font-bold text-xl xl:text-2xl'>{title}</h2>
						<Link
							href={href}
							className='font-medium text-text-blue text-[1rem] xl:text-lg hover:text-text-black transition-colors'
						>
							{subTitleTop}
						</Link>
					</HStack>
					<ComponentForm title={title} />
				</VStack>
			</div>
		</div>
	);
};
