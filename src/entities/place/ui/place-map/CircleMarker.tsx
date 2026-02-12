'use client';

import type { CircleMarker as LCircleMarker, LatLngExpression } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { CircleMarker as CircleMarkerLeaflet, Popup } from 'react-leaflet';

import { useClickPlaceInMap } from '../../hooks/useClickPlaceInMap';
import type { IPlace } from '../../types';

interface IProps {
	mark: IPlace;
	targetId: number;
}

export const CircleMarker: FC<IProps> = ({ mark, targetId }) => {
	const ref = useRef<LCircleMarker | null>(null);
	const isTarget = targetId === mark.id;

	//HELP: Делаем установку цвета через setStyle, а не через прямую установку цвета в компонент. Так как при прямой установке надо добавлять динамический ключ для маркера. Из-за этого при каждой смене динамических параметров будет перерисовываться каждый маркер. А при большом количестве маркеров, это сильная нагрузка на производительность. С помощью setStyle перерисовка не производится и все быстро работает.
	useEffect(() => {
		if (!ref.current) return;

		ref.current.setStyle({
			color: isTarget ? '#000' : `#${mark.color}`,
			radius: 6,
		});
	}, [isTarget, mark.color]);

	const onClickPlace = useClickPlaceInMap();

	return (
		<CircleMarkerLeaflet
			ref={ref}
			center={mark.crd as LatLngExpression}
			eventHandlers={{
				click: () => {
					onClickPlace(mark.id);
				},
			}}
		>
			<Popup>{mark.name}</Popup>
		</CircleMarkerLeaflet>
	);
};
