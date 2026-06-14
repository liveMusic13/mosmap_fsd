import { FC } from 'react';

import { IPlaceDetail } from '../../types';

const isLink = (value: unknown): value is string =>
	typeof value === 'string' && /^(https?:\/\/|www\.)/i.test(value.trim());

export const PlaceDetail: FC<IPlaceDetail> = ({ title, value }) => {
	const className =
		'font-medium border border-border-input-gray px-2 py-1 xl:px-4 xl:py-2 rounded-sm text-primary text-xs xl:text-sm';

	return (
		<div className='flex flex-col gap-1.5'>
			<h3 className='font-bold'>{title}</h3>
			{isLink(value) ? (
				<a
					href={value.trim().startsWith('www.') ? `https://${value.trim()}` : value.trim()}
					target='_blank'
					rel='noopener noreferrer'
					className={`${className} break-all underline`}
				>
					{value}
				</a>
			) : (
				<p className={className}>{value || ' '}</p>
			)}
		</div>
	);
};
