import { FC } from 'react';

import Button from '@/shared/ui/Button';

interface IProps {
	src: string;
	hover_text: string;
	position: 'left' | 'right';
	isDisabled?: boolean;
	onClick: () => void;
}

export const ButtonPanel: FC<IProps> = ({
	position,
	isDisabled,
	onClick,
	src,
	hover_text,
}) => {
	const positionStyle = position === 'left' ? 'left-0' : 'right-0';

	return (
		<Button
			variant='icon'
			className='relative flex items-center justify-center group w-9! h-9! xl:w-10! xl:h-10! border border-border-buttons-gray! hover:border-primary!'
			disabled={isDisabled}
			onClick={onClick}
		>
			<svg className='w-7 h-7 xl:w-8 xl:h-8 text-primary'>
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
