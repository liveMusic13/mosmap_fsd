import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import {
	useViewBlocksStore,
	useViewListsStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';

export const ResizeMap = ({ data }: { data: any }) => {
	const map = useMap();
	const view = useViewBlocksStore(store => store.view);
	const isViewLists = useViewListsStore(store => store.isView);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	useEffect(() => {
		//HELP: Вызываем перерасчет размеров, когда данные загрузились
		//HELP: или когда компонент монтируется
		map.invalidateSize();
	}, [data, map, view, isViewLists, isViewPaintingOfArea]);

	return null;
};
