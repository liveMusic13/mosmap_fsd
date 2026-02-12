import { FC } from 'react';

import { useVisibleMarkers } from '../hooks/useVisibleMarkers';

import { useZoomLevelStore } from '@/entities/map';
import { CircleMarker, Marker, Polygon } from '@/entities/place';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import type { IPlace } from '@/entities/place/types';

interface IProp {
	markers: IPlace[];
}

const RenderMarkers: FC<IProp> = ({ markers }) => {
	const zoomLevel = useZoomLevelStore(store => store.zoomLevel);
	const visibleMarkers = useVisibleMarkers(markers);
	const targetId = useTargetPlaceIdStore(store => store.id);

	return visibleMarkers.map(marker => {
		if (zoomLevel >= 16 && marker.polygon && marker.polygon.length > 0) {
			return <Polygon key={marker.id} targetId={targetId ?? 0} mark={marker} />;
		} else if (zoomLevel <= 13) {
			return (
				<CircleMarker key={marker.id} targetId={targetId ?? 0} mark={marker} />
			);
		} else {
			return <Marker key={marker.id} targetId={targetId ?? 0} mark={marker} />;
		}
	});
};

export default RenderMarkers;
