'use client';

import { FC } from 'react';

import { MobilePanel } from './MobilePanel';
import { Panel } from './Panel';
import { useTargetPlaceIdStore } from '@/entities/place';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import {
	useViewBlocksStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';
import { ILinkButtonInMapPageData } from '@/shared/types/api.types';

interface IProps {
	buttons: ILinkButtonInMapPageData[];
}

export const WrapperPanel: FC<IProps> = ({ buttons }) => {
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const view = useViewBlocksStore(store => store.view);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	const map = useGetMapForOtherPage();

	return (
		<>
			<MobilePanel
				targetPlaceId={targetPlaceId}
				view={view}
				isViewPaintingOfArea={isViewPaintingOfArea}
				map={map}
				buttons={buttons}
			/>
			<Panel
				targetPlaceId={targetPlaceId}
				view={view}
				isViewPaintingOfArea={isViewPaintingOfArea}
				map={map}
				buttons={buttons}
			/>
		</>
	);
};
