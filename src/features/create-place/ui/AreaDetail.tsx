import Link from 'next/link';
import { FC, useMemo } from 'react';

import { IAreaDetails } from '../types';

interface IProps {
	area: IAreaDetails;
}

export const AreaDetail: FC<IProps> = ({ area }) => {
	const linkData = useMemo(() => {
		if (!area.href) return null;

		const href = area.href.trim();

		// Проверка на email
		if (href.includes('@') || href.toLowerCase().startsWith('mailto:')) {
			return {
				href: href.startsWith('mailto:') ? href : `mailto:${href}`,
				isExternal: false,
			};
		}

		// Проверка на телефон
		if (/^[\d\s+()-]+$/.test(href) || href.toLowerCase().startsWith('tel:')) {
			return {
				href: href.startsWith('tel:') ? href : `tel:${href.replace(/\s/g, '')}`,
				isExternal: false,
			};
		}

		// Обычная ссылка
		return {
			href: href,
			isExternal: true,
		};
	}, [area.href]);

	return (
		<div className='flex flex-col gap-1.5'>
			<h3 className='font-bold'>{area.name}</h3>
			{linkData ? (
				<Link
					className='font-medium border border-border-input-gray px-2 py-1 xl:px-4 xl:py-2 rounded-sm text-primary text-xs xl:text-sm'
					href={linkData.href}
					{...(linkData.isExternal && {
						target: '_blank',
						rel: 'nofollow',
					})}
				>
					{area.value}
				</Link>
			) : (
				<p className='font-medium border border-border-input-gray px-2 py-1 xl:px-4 xl:py-2 rounded-sm text-primary text-xs xl:text-sm'>
					{area.value || 'Нету данных'}
				</p>
			)}
		</div>
	);
};
