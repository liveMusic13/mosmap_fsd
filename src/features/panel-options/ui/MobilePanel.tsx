'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { settingsArr, standardArr } from '../data/buttonsPanel';
import { toggleActiveIcon } from '../lib/helpers';

import { ButtonPanel } from './ButtonPanel';
import { LinkPanel } from './LinkPanel';
import { useCheckToken } from '@/app/providers/TokenProvider';
import { checkMapAccess } from '@/shared/lib/decodedToken';
import { getQueryStringForMobilePanel } from '@/shared/lib/url';
import {
	useViewBlocksStore,
	useViewListsStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';
import { ILinkButtonInMapPageData } from '@/shared/types/api.types';
import { TViewBlocks } from '@/shared/types/store.types';
import Line from '@/shared/ui/Line';

interface IProps {
	targetPlaceId: number | null;
	view: TViewBlocks;
	isViewPaintingOfArea: boolean;
	map: string;
	buttons: ILinkButtonInMapPageData[];
}

export const MobilePanel: FC<IProps> = ({
	targetPlaceId,
	view,
	isViewPaintingOfArea,
	map,
	buttons,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const isViewList = useViewListsStore(store => store.isView);
	const openView = useViewBlocksStore(store => store.openView);
	const setIsViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.setIsView,
	);

	const queryString = getQueryStringForMobilePanel(searchParams, map);

	const { token, decodeToken } = useCheckToken();
	const tokenHasMapAccess = checkMapAccess(
		Number(map),
		decodeToken,
	).hasMapAccess;

	const handleStandard = (id: number) => {
		if (id === 0) {
			if (tokenHasMapAccess) {
				router.push(`/import/?${queryString}`);
			}
		} else if (id === 1) {
			if (tokenHasMapAccess) {
				router.push(`/export/?${queryString}`);
			}
		} else if (id === 2) {
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
		} else if (id === 4) {
			openView('create-place');
		} else if (id === 5) {
			router.push(`/settings-database/?${queryString}`);
		} else if (id === 7) {
			const url = queryString
				? `/mobile-painting-of-area/?${queryString}`
				: `/mobile-painting-of-area/`;
			if (pathname.startsWith('/mobile-painting-of-area')) {
				router.push(`/${queryString}`);
			} else {
				if (isViewPaintingOfArea) {
					setIsViewPaintingOfArea(false);
				} else {
					router.push(`${url}`);
				}
			}
		}
	};

	const isDisabled = (id: number) => {
		if (id === 0 || id === 1) {
			if (!tokenHasMapAccess) return true;
		} else if (!targetPlaceId && view !== 'area-info' && id === 4) {
			return true;
		}
		return false;
	};

	return (
		<div className='flex sm:hidden gap-2 items-center min-w-0 w-full max-w-full min-h-14 h-14 sm:h-9 xl:h-11 shadow-custom-black rounded-xl px-1 overflow-x-auto scrollbar-custom'>
			{buttons.map((but, ind) => {
				return (
					<LinkPanel
						key={ind}
						hover_text={but.text}
						position='left'
						url={but.url}
						src={but.image_min}
						isMobile={true}
					/>
				);
			})}
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
						isDisabled={isDisabled(but.id)}
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
					onClick={() => handleStandard(but.id)}
				/>
			))}
		</div>
	);
};
