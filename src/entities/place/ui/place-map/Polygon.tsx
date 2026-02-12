import type { Polygon as LPolygon, LatLngExpression } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { Polygon as PolygonLeaflet, Popup } from 'react-leaflet';

import { useClickPlaceInMap } from '../../hooks/useClickPlaceInMap';
import type { IPlace } from '../../types';

interface IProp {
	targetId: number;
	mark: IPlace;
}

export const Polygon: FC<IProp> = ({ targetId, mark }) => {
	const ref = useRef<LPolygon | null>(null);
	const isTarget = targetId === mark.id;

	const onClickPlace = useClickPlaceInMap();

	//HELP: Делаем установку цвета через setStyle, а не через прямую установку цвета в компонент. Так как при прямой установке надо добавлять динамический ключ для маркера. Из-за этого при каждой смене динамических параметров будет перерисовываться каждый маркер. А при большом количестве маркеров, это сильная нагрузка на производительность. С помощью setStyle перерисовка не производится и все быстро работает.
	useEffect(() => {
		if (!ref.current) return;

		ref.current.setStyle({
			color: isTarget ? '#000' : `#${mark.color}`,
			weight: isTarget ? 6 : 3,
		});
	}, [isTarget, mark.color]);

	return (
		<PolygonLeaflet
			ref={ref}
			positions={mark.polygon as LatLngExpression[]}
			eventHandlers={{
				click: e => {
					const L = (window as any).L;
					if (L && L.DomEvent) {
						L.DomEvent.stopPropagation(e);
					}
					onClickPlace(mark.id);
				},
			}}
		>
			<Popup>{mark.name}</Popup>
		</PolygonLeaflet>
	);
};
