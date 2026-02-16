import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const ResizeMap = ({ data }: { data: any }) => {
	const map = useMap();

	useEffect(() => {
		//HELP: Вызываем перерасчет размеров, когда данные загрузились
		//HELP: или когда компонент монтируется
		map.invalidateSize();
	}, [data, map]);

	return null;
};
