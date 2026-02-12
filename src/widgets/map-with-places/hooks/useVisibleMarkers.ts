import { LatLngBounds } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-leaflet';

import { IPlace } from '@/entities/place/types';

export const useVisibleMarkers = (markers: IPlace[]) => {
	const map = useMap();
	const [bounds, setBounds] = useState<LatLngBounds | null>(null);

	useEffect(() => {
		if (!map) return;

		const updateBounds = () => {
			setBounds(map.getBounds());
		};

		updateBounds();

		map.on('moveend zoomend', updateBounds);

		return () => {
			map.off('moveend zoomend', updateBounds);
		};
	}, [map]);

	const visibleMarkers = useMemo(() => {
		if (!bounds) return [];

		return markers.filter(marker => {
			if (!marker.crd) return false;

			const [lat, lng] = marker.crd;

			if (typeof lat !== 'number' || typeof lng !== 'number') {
				return false;
			}

			return bounds.contains([lat, lng]);
		});
	}, [bounds, markers]);

	return visibleMarkers;
};
