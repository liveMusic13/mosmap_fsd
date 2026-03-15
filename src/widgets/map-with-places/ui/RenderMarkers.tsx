import { FC } from 'react';

import { useVisibleMarkers } from '../hooks/useVisibleMarkers';

import RenderAvailabilityZoneAndMarkers from './RenderAvailabilityZoneAndMarkers';
import { useZoomLevelStore } from '@/entities/map';
import { useCrdAreaStore } from '@/entities/place';
import { useGetSizeMarker } from '@/entities/place/hooks/useGetSizeMarker';
import { useViewAvailabilityZoneStore } from '@/entities/place/store/availabilityZone';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import type { IPlace } from '@/entities/place/types';
import { CircleMarker } from '@/entities/place/ui/place-map/CircleMarker';
import { Marker } from '@/entities/place/ui/place-map/Marker';
import { Polygon } from '@/entities/place/ui/place-map/Polygon';
import { useGetAvailabilityZone } from '@/widgets/availability-zone/hooks/useGetAvailabilityZone';

interface IProp {
	markers: IPlace[];
	isAllIcons: boolean;
}

const RenderMarkers: FC<IProp> = ({ markers, isAllIcons }) => {
	const zoomLevel = useZoomLevelStore(store => store.zoomLevel);
	const visibleMarkers = useVisibleMarkers(markers);
	const targetId = useTargetPlaceIdStore(store => store.id);
	const sizeMarker = useGetSizeMarker();
	const isViewAvailabilityZone = useViewAvailabilityZoneStore(
		store => store.isView,
	);
	// const idTargetPlace = useTargetPlaceIdStore(store => store.id);
	const crdArea = useCrdAreaStore(store => store.crd);
	const { data, isSuccess, isLoading } = useGetAvailabilityZone({
		id: targetId,
		lat: crdArea?.lat,
		lng: crdArea?.lng,
		isViewAvailabilityZone,
	});

	const zonePolygons =
		isViewAvailabilityZone && isSuccess ? (
			<RenderAvailabilityZoneAndMarkers data={data} />
		) : null;

	const mainMarkers = visibleMarkers.map(marker => {
		if (zoomLevel >= 16 && marker.polygon && marker.polygon.length > 0) {
			return <Polygon key={marker.id} targetId={targetId ?? 0} mark={marker} />;
		} else if (zoomLevel <= 13 && !isAllIcons) {
			return (
				<CircleMarker key={marker.id} targetId={targetId ?? 0} mark={marker} />
			);
		} else {
			return (
				<Marker
					key={marker.id}
					targetId={targetId ?? 0}
					mark={marker}
					sizeMarker={sizeMarker}
				/>
			);
		}
	});
	return (
		<>
			{mainMarkers}
			{zonePolygons}
		</>
	);
	// return visibleMarkers.map(marker => {
	// 	if (zoomLevel >= 16 && marker.polygon && marker.polygon.length > 0) {
	// 		return <Polygon key={marker.id} targetId={targetId ?? 0} mark={marker} />;
	// 	} else if (zoomLevel <= 13 && !isAllIcons) {
	// 		return (
	// 			<CircleMarker key={marker.id} targetId={targetId ?? 0} mark={marker} />
	// 		);
	// 	} else {
	// 		return (
	// 			<Marker
	// 				key={marker.id}
	// 				targetId={targetId ?? 0}
	// 				mark={marker}
	// 				sizeMarker={sizeMarker}
	// 			/>
	// 		);
	// 	}
	// });
};

export default RenderMarkers;
