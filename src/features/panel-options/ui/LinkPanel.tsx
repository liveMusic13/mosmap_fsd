import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface IProps {
	src: string;
	hover_text: string;
	position: 'left' | 'right';
	isRed?: boolean;
	url: string;
	isMobile?: boolean;
}

export const LinkPanel: FC<IProps> = ({
	position,
	src,
	hover_text,
	url,
	isMobile,
}) => {
	const positionStyle = position === 'left' ? 'left-0' : 'right-0';

	return (
		<Link
			href={url}
			target='_blank'
			className='relative group border border-border-buttons-gray hover:border-primary rounded-md p-0.5 shrink-0'
		>
			<Image
				width={isMobile ? 20 : 220}
				height={isMobile ? 20 : 40}
				src={src}
				alt={hover_text}
				className='w-9.5 h-9.5 sm:w-32 sm:h-5.5 xl:w-42 xl:h-6.5'
			/>
			<p
				className={`absolute hidden z-99999 group-hover:block -bottom-full ${positionStyle} whitespace-nowrap rounded-md bg-[#2e2e2e] text-white px-2 py-1 text-xs`}
			>
				{hover_text}
			</p>
		</Link>
	);
};
