import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapCursorController = ({ isMoveCursor }: { isMoveCursor: boolean }) => {
	const map = useMap();

	useEffect(() => {
		const container = map.getContainer();

		if (isMoveCursor) {
			container.classList.add('map-move-marker-mode');
		} else {
			container.classList.remove('map-move-marker-mode');
		}
	}, [isMoveCursor, map]);

	return null;
};

export default MapCursorController;
