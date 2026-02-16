'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { MobilePanel } from './MobilePanel';
import { Panel } from './Panel';
import { useTargetPlaceIdStore } from '@/entities/place';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import {
	useViewBlocksStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';

export const WrapperPanel: FC = () => {
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const view = useViewBlocksStore(store => store.view);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const searchParams = useSearchParams();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);

	const { data } = useGetMapPageData(queryString);
	const map = String(data?.map);

	return (
		<>
			<MobilePanel
				targetPlaceId={targetPlaceId}
				view={view}
				isViewPaintingOfArea={isViewPaintingOfArea}
				map={map}
			/>
			<Panel
				targetPlaceId={targetPlaceId}
				view={view}
				isViewPaintingOfArea={isViewPaintingOfArea}
			/>
		</>
	);
};
