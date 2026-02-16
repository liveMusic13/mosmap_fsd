'use client';

import { LatLngExpression } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { useCenterMapStore } from '../store/centerMap.store';

interface IProps {
	toZoom: number | undefined;
}

export const FlyToLocation: FC<IProps> = ({ toZoom }) => {
	const map = useMap();
	const centerMap = useCenterMapStore(store => store.centerMap);
	const hasFlownRef = useRef(false);

	useEffect(() => {
		if (!centerMap) {
			return;
		}

		const isDefault =
			JSON.stringify(centerMap) === JSON.stringify([55.7522, 37.6156]);

		if (isDefault) {
			// При дефолтных координатах вообще ничего не делаем
			return;
		}

		// Проверяем, что это не первая загрузка с дефолтными координатами
		const { lat, lng } = map.getCenter();

		const isCurrentDefault =
			JSON.stringify([lat.toFixed(4), lng.toFixed(4)]) ===
			JSON.stringify(['55.7522', '37.6156']);

		if (isCurrentDefault && !hasFlownRef.current) {
			console.log(
				"Current position is default and haven't flown yet, skipping",
			);
			return;
		}

		if (
			lat.toFixed(5) === (centerMap as number[])[0].toFixed(5) &&
			lng.toFixed(5) === (centerMap as number[])[1].toFixed(5)
		) {
			console.log('Already at target coordinates');
			return;
		}
		hasFlownRef.current = true;

		const targetZoom = toZoom ? toZoom - 2 : map.getZoom(); // Вернул оригинальную логику, но с меньшим зумом

		map.flyTo(centerMap as LatLngExpression, targetZoom, {
			animate: true,
			duration: 1,
		});
	}, [centerMap, map, toZoom]);

	return null;
};
