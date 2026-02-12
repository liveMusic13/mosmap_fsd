// 'use client';

// import { LatLngExpression } from 'leaflet';
// import { FC, useMemo } from 'react';
// import { Marker } from 'react-leaflet';

// interface IProps {
// 	coords: number[];
// }

// export const AreaMarker: FC<IProps> = ({ coords }) => {
// 	const markerIcon = useMemo(() => {
// 		if (typeof window === 'undefined') return undefined;

// 		const L = require('leaflet');
// 		return L.icon({
// 			iconUrl: '/images/icons/marker.png',
// 			iconSize: [22, 22],
// 		});
// 	}, []);

// 	if (!markerIcon) return null;

// 	return <Marker position={coords as LatLngExpression} icon={markerIcon} />;
// };

'use client';

import { LatLngExpression } from 'leaflet';
import { FC, useMemo } from 'react';
import { Marker } from 'react-leaflet';

interface IProps {
	coords: number[];
}

export const AreaMarker: FC<IProps> = ({ coords }) => {
	const icon = useMemo(() => {
		// Динамический импорт leaflet только на клиенте
		if (typeof window !== 'undefined') {
			const L = require('leaflet');
			return L.icon({
				iconUrl: '/images/icons/marker.png',
				iconSize: [22, 22],
			});
		}
		return undefined;
	}, []);

	if (!icon) return null;

	return <Marker position={coords as LatLngExpression} icon={icon} />;
};
