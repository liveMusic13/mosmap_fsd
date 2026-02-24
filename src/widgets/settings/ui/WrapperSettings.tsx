'use client';

import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

import Button from '@/shared/ui/Button';

interface IProps {
	title: string;
	children: ReactNode;
}

const WrapperSettings: FC<IProps> = ({ title, children }) => {
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<div className='flex flex-col shadow-custom-green border border-border-gray rounded-xl max-h-full min-h-0 p-4 min-w-sm max-w-5xl '>
			<div className='border-b border-b-dotted border-b-border-dotted pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 shrink-0'>
				<h1 className='font-bold text-lg whitespace-nowrap'>{title}</h1>
				<Button onClick={handleBack} className='w-auto!'>
					Назад
				</Button>
			</div>
			{children}
		</div>
	);
};

export default WrapperSettings;
