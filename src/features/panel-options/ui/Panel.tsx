'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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

export const Panel: FC<IProps> = ({
	isViewPaintingOfArea,
	targetPlaceId,
	view,
	map,
	buttons,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const openView = useViewBlocksStore(store => store.openView);
	const closeView = useViewBlocksStore(store => store.closeView);
	const { isView, setIsView: setIsViewLists } = useViewListsStore(
		store => store,
	);
	const toggleViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.toggleView,
	);

	const { token, decodeToken } = useCheckToken();
	const tokenHasMapAccess = checkMapAccess(
		Number(map),
		decodeToken,
	).hasMapAccess;

	const queryString = getQueryStringForMobilePanel(searchParams, map);

	const handleStandard = (id: number) => {
		switch (id) {
			case 0: {
				if (tokenHasMapAccess) {
					router.push(`/import/?${queryString}`);
				}
				break;
			}
			case 1: {
				if (tokenHasMapAccess) {
					router.push(`/export/?${queryString}`);
				}
				break;
			}
			case 2: {
				if (view === 'filters') {
					closeView();
				} else {
					openView('filters');
				}
				break;
			}
			case 3:
				setIsViewLists(!isView);
				break;
			case 4:
				openView('create-place');
				break;
			case 5:
				router.push(`/settings-database/?${queryString}`);
				break;
			case 7:
				toggleViewPaintingOfArea();
				break;
		}
	};

	const isDisabled = (id: number) => {
		if (id === 0 || id === 1 || id === 5) {
			if (!tokenHasMapAccess) return true;
		} else if (!targetPlaceId && view !== 'area-info' && id === 4) {
			return true;
		}
		return false;
	};

	return (
		<div className='hidden sm:flex items-center justify-between w-full h-9 xl:h-11 shadow-custom-black rounded-xl px-1'>
			<div className='flex gap-1 items-center'>
				{standardArr.map(but => {
					const isRed =
						(isViewPaintingOfArea && but.id === 7) ||
						(view === 'create-place' && but.id === 4);

					return (
						<ButtonPanel
							key={but.id}
							isRed={isRed}
							hover_text={but.hover_text}
							src={toggleActiveIcon(but, view)}
							position='left'
							isDisabled={isDisabled(but.id)}
							onClick={() => handleStandard(but.id)}
						/>
					);
				})}
				{buttons.map((but, ind) => {
					return (
						<LinkPanel
							key={ind}
							hover_text={but.text}
							position='left'
							url={but.url}
							src={but.image_full}
						/>
					);
				})}
				<Line className='h-7! xl:h-8.5! bg-text-disabled!' />
				<Line className='h-7! xl:h-8.5! bg-text-disabled!' />
			</div>
			<div className='flex gap-1 items-center'>
				<Line className='h-7! xl:h-8.5! bg-text-disabled!' />
				<Line className='h-7! xl:h-8.5! bg-text-disabled!' />
				{settingsArr.map(but => (
					<ButtonPanel
						key={but.id}
						hover_text={but.hover_text}
						src={but.src_active}
						position='right'
						isDisabled={isDisabled(but.id)}
						onClick={() => handleStandard(but.id)}
					/>
				))}
			</div>
		</div>
	);
};
