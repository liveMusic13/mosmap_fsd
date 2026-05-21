import { LatLngExpression, CircleMarker as LeafletCircleMarker } from 'leaflet';
import { FC, useEffect, useMemo, useRef } from 'react';
import { CircleMarker, Polygon, Popup } from 'react-leaflet';
import { useShallow } from 'zustand/shallow';

import { useTargetPlaceIdStore } from '@/entities/place';
import { useAvailabilityZoneStore } from '@/entities/place/store/availabilityZone';
import { IAvailabilityZone } from '@/widgets/availability-zone/types';

interface IProps {
	data: IAvailabilityZone | undefined;
}

const RenderAvailabilityZoneAndMarkers: FC<IProps> = ({ data }) => {
	const markersRef = useRef<Map<string, LeafletCircleMarker>>(new Map());
	const prevActiveId = useRef<string | null>(null);
	const targetId = useTargetPlaceIdStore(store => store.id);

	const idAvailabilityZone = useAvailabilityZoneStore(
		useShallow(store => store.idAvailabilityZone),
	);

	const organizationIdAvailabilityZone = useAvailabilityZoneStore(
		store => store.organizationIdAvailabilityZone,
	);
	const setOrganizationIdAvailabilityZone = useAvailabilityZoneStore(
		store => store.setOrganizationIdAvailabilityZone,
	);

	useEffect(
		() =>
			console.log(
				'in render zone',
				idAvailabilityZone,
				organizationIdAvailabilityZone,
			),
		[organizationIdAvailabilityZone, idAvailabilityZone],
	);

	const markers = useMemo(() => {
		if (!data || idAvailabilityZone.length === 0 || !data.orgs) return [];

		const newMarkers: any[] = [];
		idAvailabilityZone.forEach((id: number) => {
			const group = data.orgs.find(el => Number(el.group_id) === id);
			if (group?.org) {
				group.org.forEach((org: any) => {
					if (org.lat && org.lng) newMarkers.push(org);
				});
			}
		});
		return newMarkers;
	}, [data, idAvailabilityZone, targetId]);

	useEffect(() => {
		if (prevActiveId.current) {
			const prevMarker = markersRef.current.get(prevActiveId.current);
			if (prevMarker) prevMarker.setStyle({ fillColor: '#000' });
		}

		const activeMarker = markersRef.current.get(organizationIdAvailabilityZone);
		if (activeMarker) {
			activeMarker.setStyle({ fillColor: '#117474' });
			prevActiveId.current = organizationIdAvailabilityZone;
		}
	}, [organizationIdAvailabilityZone]);

	// Условный возврат — ТОЛЬКО после всех хуков
	if (!data) return null;

	return (
		<>
			{data.area && (
				<Polygon
					positions={data.area as unknown as LatLngExpression[][]}
					color='red'
					fillOpacity={0.2}
					interactive={false}
				/>
			)}
			{markers.map((marker, ind) => {
				// Стабильный ID
				const markerId = `${marker.name}${marker.distance}`;

				return (
					<CircleMarker
						ref={ref => {
							if (ref) {
								markersRef.current.set(markerId, ref);
							} else {
								markersRef.current.delete(markerId);
							}
						}}
						// КЛЮЧ ДОЛЖЕН БЫТЬ СТАБИЛЬНЫМ! Убираем ind и isSelected
						key={`${markerId}-${ind}`}
						center={[Number(marker.lat), Number(marker.lng)]}
						radius={10}
						// Начальный цвет (React установит его один раз при монтировании)
						fillColor={
							organizationIdAvailabilityZone === markerId ? '#117474' : '#000'
						}
						color='#fff'
						weight={6}
						fillOpacity={0.7}
						eventHandlers={{
							click: () => {
								setOrganizationIdAvailabilityZone(markerId);
							},
						}}
					>
						<Popup>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div>{marker.name}</div>
								<div className='text-sm text-gray-600'>
									Расстояние {marker.distance} м.
								</div>
							</div>
						</Popup>
					</CircleMarker>
				);
			})}
		</>
	);
};

export default RenderAvailabilityZoneAndMarkers;
