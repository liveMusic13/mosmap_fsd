'use client';

import { FC, Suspense } from 'react';

import { useInitialViewBlocks } from '../hooks/useInitialViewBlocks';

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
	isClearMap: boolean | undefined;
}
//HELP: Важно: клиентские компоненты надо импортировать не через index.ts а напрямую. иначе они заранее подтягиваются и будут вызывать ошибку "window is undefined"
const WrapperAllMapContent: FC<IProps> = ({ places, isClearMap }) => {
	const view = useViewBlocksStore(store => store.view);
	const isViewLists = useViewListsStore(store => store.isView);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	useInitialViewBlocks(isClearMap);

	return (
		<div className='flex flex-col sm:flex-row min-h-0 min-w-0 flex-1 gap-3'>
			{view === 'filters' && (
				<div className='hidden sm:block'>
					<WrapperFilters />
				</div>
			)}
			{(view === 'place-info' ||
				view === 'area-info' ||
				view === 'create-place') && (
				<div className='hidden sm:flex sm:w-56 xl:w-sm'>
					<PlaceInfoWidget />
				</div>
			)}
			{isViewLists && (
				<div className='hidden sm:block'>
					<Suspense fallback={<ListPlacesServer places={places} />}>
						<ListPlaces />
					</Suspense>
				</div>
			)}
			{isViewPaintingOfArea && (
				<div className='hidden sm:block'>
					<PaintingOfAreas />
				</div>
			)}
			{/* {isViewPaintingOfArea && (
				<div className='absolute -z-50 opacity-0 sm:block'>
					<PaintingOfAreas />
				</div>
			)} */}
			<div className='flex flex-1 min-h-1/2 min-w-0'>
				<WrapperMapDynamic />
			</div>
			{/*HELP: Пока что не буду делать появление плашки при клики на область или объект на карте. Сейчас сразу появляется. Если вдруг надо будет сделать появление плашки и только по клику на неё отображать, то сделать появление плашки в зависимости от условия "(view === 'place-info' ||
				view === 'area-info' ||
				view === 'create-place')" а PlaceInfoWidget отображать по значению локального булиновского значения стейта и именно его изменять. либо добавить новый стейт в редакс, если надо будет управление извне и так же по нему отображать */}
			{(view === 'place-info' ||
				view === 'area-info' ||
				view === 'create-place') && (
				<div className='block w-full max-h-1/2 min-h-0 overflow-scroll scrollbar-custom sm:hidden'>
					<PlaceInfoWidget />
				</div>
			)}
		</div>
	);
};

export default WrapperAllMapContent;
