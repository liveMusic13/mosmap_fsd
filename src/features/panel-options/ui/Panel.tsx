'use client';

import { FC } from 'react';

import { settingsArr, standardArr } from '../data/buttonsPanel';
import { toggleActiveIcon } from '../lib/helpers';

import { ButtonPanel } from './ButtonPanel';
import {
	useViewBlocksStore,
	useViewListsStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';
import { TViewBlocks } from '@/shared/types/store.types';
import Line from '@/shared/ui/Line';

interface IProps {
	targetPlaceId: number | null;
	view: TViewBlocks;
	isViewPaintingOfArea: boolean;
}

export const Panel: FC<IProps> = ({
	isViewPaintingOfArea,
	targetPlaceId,
	view,
}) => {
	const openView = useViewBlocksStore(store => store.openView);
	const closeView = useViewBlocksStore(store => store.closeView);
	const { isView, setIsView: setIsViewLists } = useViewListsStore(
		store => store,
	);
	const toggleViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.toggleView,
	);

	const handleStandard = (id: number) => {
		switch (id) {
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
			case 7:
				toggleViewPaintingOfArea();
				break;
		}
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
							isDisabled={
								!targetPlaceId && view !== 'area-info' && but.id === 4
							}
							onClick={() => handleStandard(but.id)}
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
						onClick={() => {}}
					/>
				))}
			</div>
		</div>
	);
};
