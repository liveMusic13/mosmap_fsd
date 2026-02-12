'use client';

import { FC, Suspense } from 'react';

import { IPlace } from '@/entities/place/types';
import WrapperFilters from '@/features/filters-map/ui/WrapperFilters';
import {
	useViewBlocksStore,
	useViewListsStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';
import ListPlaces from '@/widgets/list-places/ui/ListPlaces';
import ListPlacesServer from '@/widgets/list-places/ui/ListPlacesServer';
import WrapperMapDynamic from '@/widgets/map-with-places/ui/WrapperMapDynamic';
import { PaintingOfAreas } from '@/widgets/painting-of-areas';
import { PlaceInfoWidget } from '@/widgets/place-info';

interface IProps {
	places: IPlace[];
}
//HELP: Важно: клиентские компоненты надо импортировать не через index.ts а напрямую. иначе они заранее подтягиваются и будут вызывать ошибку "window is undefined"
const WrapperAllMapContent: FC<IProps> = ({ places }) => {
	const view = useViewBlocksStore(store => store.view);
	const isViewLists = useViewListsStore(store => store.isView);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	return (
		<div className='flex min-h-0 min-w-0 flex-1 gap-3'>
			{view === 'filters' && <WrapperFilters />}
			{(view === 'place-info' ||
				view === 'area-info' ||
				view === 'create-place') && <PlaceInfoWidget />}
			{isViewLists && (
				<Suspense fallback={<ListPlacesServer places={places} />}>
					<ListPlaces />
				</Suspense>
			)}
			{isViewPaintingOfArea && <PaintingOfAreas />}
			<WrapperMapDynamic />
		</div>
	);
};

export default WrapperAllMapContent;
