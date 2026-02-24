import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { useViewBlocksStore } from '@/shared/store/panelOptions.store';

export const ResizeMap = ({ data }: { data: any }) => {
	const map = useMap();
	const view = useViewBlocksStore(store => store.view);

	useEffect(() => {
		//HELP: Вызываем перерасчет размеров, когда данные загрузились
		//HELP: или когда компонент монтируется
		map.invalidateSize();
	}, [data, map, view]);

	return null;
};
