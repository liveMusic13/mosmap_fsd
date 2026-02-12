import dynamic from 'next/dynamic';

export * from './api/placeApi';
export { useDeletePlace } from './hooks/useDeletePlace';
export { useGetDetailsPlace } from './hooks/useGetDetailsPlace';
export { useSavePlaceInfo } from './hooks/useSavePlaceInfo';
export { useCrdAreaStore } from './store/crdArea.store';
export { useMoveMarkerStore } from './store/moveMarker.store';
export { useTargetPlaceIdStore } from './store/targetPlace.store';
export { EditPlaceDetail } from './ui/place-info/EditPlaceDetail';
export { PlaceDetail } from './ui/place-info/PlaceDetail';
export * from './ui/place-info/PlaceFormProvider';
export { PlaceListItem } from './ui/PlaceListItem';
export const CircleMarker = dynamic(
	() =>
		import('@/entities/place/ui/place-map/CircleMarker').then(
			mod => mod.CircleMarker,
		),
	{
		ssr: false,
	},
);

export const Marker = dynamic(
	() => import('@/entities/place/ui/place-map/Marker').then(mod => mod.Marker),
	{
		ssr: false,
	},
);

export const Polygon = dynamic(
	() =>
		import('@/entities/place/ui/place-map/Polygon').then(mod => mod.Polygon),
	{
		ssr: false,
	},
);
