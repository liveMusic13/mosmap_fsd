'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { settingsArr, standardArr } from '../data/buttonsPanel';
import { toggleActiveIcon } from '../lib/helpers';

import { ButtonPanel } from './ButtonPanel';
import { getQueryStringForMobilePanel } from '@/shared/lib/url';
import { useViewListsStore } from '@/shared/store/panelOptions.store';
import { TViewBlocks } from '@/shared/types/store.types';
import Line from '@/shared/ui/Line';

interface IProps {
	targetPlaceId: number | null;
	view: TViewBlocks;
	isViewPaintingOfArea: boolean;
	map: string;
}

export const MobilePanel: FC<IProps> = ({
	targetPlaceId,
	view,
	isViewPaintingOfArea,
	map,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const isViewList = useViewListsStore(store => store.isView);

	const queryString = getQueryStringForMobilePanel(searchParams, map);

	const handleStandard = (id: number) => {
		if (id === 2) {
			const url = queryString
				? `/mobile-filters/?${queryString}`
				: `/mobile-filters/`;

			if (pathname.startsWith('/mobile-filters')) {
				router.push(`/${queryString}`);
			} else {
				router.push(`${url}`);
			}
		} else if (id === 3) {
			// const url = queryString
			// 	? `/mobile-filters/list-places?${queryString}`
			// 	: `/mobile-filters/list-places`;
			const url = queryString
				? `/mobile-list/?${queryString}`
				: `/mobile-list/`;

			if (pathname.startsWith('/mobile-list')) {
				router.push(`/${queryString}`);
			} else {
				router.push(`${url}`);
			}
		}
	};

	return (
		<div className='flex sm:hidden gap-2 items-center w-full min-h-14 h-14 sm:h-9 xl:h-11 shadow-custom-black rounded-xl px-1 overflow-x-auto scrollbar-custom'>
			{standardArr.map(but => {
				const isRed =
					(isViewPaintingOfArea && but.id === 7) ||
					(view === 'create-place' && but.id === 4);
				return (
					<ButtonPanel
						key={but.id}
						isRed={isRed}
						hover_text={but.hover_text}
						src={toggleActiveIcon(but, view, isViewList)}
						position='left'
						isDisabled={!targetPlaceId && view !== 'area-info' && but.id === 4}
						onClick={() => handleStandard(but.id)}
					/>
				);
			})}
			<div className='h-full flex gap-2 items-center'>
				<Line className='h-10 sm:h-7! xl:h-8.5! bg-text-disabled!' />
				<Line className='h-10 sm:h-7! xl:h-8.5! bg-text-disabled!' />
			</div>
			{settingsArr.map(but => (
				<ButtonPanel
					key={but.id}
					hover_text={but.hover_text}
					src={but.src_active}
					position='right'
					onClick={() => {}}
				/>
			))}
		</div>
	);
};
