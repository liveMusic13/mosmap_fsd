'use client';

import { FC } from 'react';

import Button from '@/shared/ui/Button';

interface IProps {
	src: string;
	hover_text: string;
	position: 'left' | 'right';
	isDisabled?: boolean;
	onClick: () => void;
	isRed?: boolean;
}

export const ButtonPanel: FC<IProps> = ({
	position,
	isDisabled,
	onClick,
	src,
	hover_text,
	isRed,
}) => {
	const positionStyle = position === 'left' ? 'left-0' : 'right-0';
	const colorIcon = isRed ? 'text-text-red' : 'text-primary';

	return (
		<Button
			variant='icon'
			className='relative group w-12! h-12!  sm:w-7! sm:h-7! xl:w-8.5! xl:h-8.5! border border-border-buttons-gray! hover:border-primary!'
			disabled={isDisabled}
			onClick={onClick}
		>
			<svg
				className={`w-10.5 h-10.5 sm:w-6.5 sm:h-6.5 xl:w-8 xl:h-8 ${colorIcon}`}
			>
				<use xlinkHref={`/images/icons/sprite.svg#${src}`}></use>
			</svg>
			<p
				className={`absolute hidden z-99999 group-hover:block -bottom-full ${positionStyle} whitespace-nowrap rounded-md bg-[#2e2e2e] text-white px-2 py-1 text-xs`}
			>
				{hover_text}
			</p>
		</Button>
	);
};
