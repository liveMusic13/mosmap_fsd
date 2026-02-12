import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';

import { useZoomLevelStore } from '../store/zoom.store';

export const ZoomTracker: FC = () => {
	const setZoomLevel = useZoomLevelStore(state => state.setZoomLevel);
	const map = useMapEvents({
		zoomend: () => setZoomLevel(map.getZoom()),
	});
	return null;
};
