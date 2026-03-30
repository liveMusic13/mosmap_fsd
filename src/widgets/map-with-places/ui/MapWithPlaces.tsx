'use client';

import { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import ColorMapPolygons from './ColorMapPolygons';
import { MapClickHandler } from './MapClickHandler';
import RenderMarkers from './RenderMarkers';
import {
	FlyToLocation,
	ZoomTracker,
	useCenterMapStore,
	useZoomLevelStore,
} from '@/entities/map';
import { ResizeMap } from '@/entities/map/ui/ResizeMap';
import { useCrdAreaStore, useMoveMarkerStore } from '@/entities/place';
import { SearchAddress } from '@/features/search-address';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';
import MapCursorController from '@/shared/ui/MapCursorController';
import { Loader } from '@/shared/ui/loader/Loader';
import { PanelOptionsInMap } from '@/widgets/panel-options-in-map/ui/PanelOptionsInMap';

const DynamicAreaMarker = dynamic(
	() =>
		import('@/features/create-place/ui/AreaMarker').then(mod => mod.AreaMarker),
	{ ssr: false },
);

const DynamicSelectAreaDraw = dynamic(
	() =>
		import('@/features/select-area/ui/SelectAreaDraw').then(
			mod => mod.SelectAreaDraw,
		),
	{ ssr: false },
);

const MapWithPlaces: FC = () => {
	const searchParams = useSearchParams();
	const centerMap = useCenterMapStore(store => store.centerMap);
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const isMoveMarker = useMoveMarkerStore(store => store.isMove);
	const view = useViewBlocksStore(store => store.view);

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { data, isLoading } = useGetMapPageData(queryString);
	const markers = useMemo(() => data?.points ?? [], [data?.points]);
	const zoomLevel = useZoomLevelStore(store => store.zoomLevel);
	const crdArea = useCrdAreaStore(store => store.crd);

	// console.log('map-data', data);

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-1 rounded-xl relative'>
			<PanelOptionsInMap />
			<SearchAddress />
			<MapContainer
				center={centerMap as LatLngExpression}
				minZoom={data?.zoom_min}
				maxZoom={data?.zoom_max}
				zoom={zoomLevel}
				className={`flex-1 rounded-xl`}
			>
				<ResizeMap data={data} />
				<TileLayer url={data?.tiles_url || ''} />
				<ZoomTracker />
				<MapCursorController
					isMoveCursor={isMoveMarker || view === 'create-place'}
				/>
				<FlyToLocation toZoom={data?.zoom_max} />
				<MapClickHandler />
				{/* HELP: Рендерим маркер зоны, если есть координаты. Делаем это здесь а не в рендере остальных маркеров, потому что при кластеризации нужно чтобы он был виден. А при выводе маркера в RenderMarkers он будет попадать в кластеризацию */}
				{crdArea && (
					<DynamicAreaMarker
						key={`area-marker-${crdArea.lat}-${crdArea.lng}`}
						coords={[crdArea.lat, crdArea.lng]}
					/>
				)}
				<ColorMapPolygons />
				{data?.clastering == '1' ? (
					<MarkerClusterGroup chunkedLoading={true}>
						<RenderMarkers
							markers={markers}
							isAllIcons={data?.canvas_map === 0 ? true : false}
						/>
					</MarkerClusterGroup>
				) : (
					<RenderMarkers
						markers={markers}
						isAllIcons={data?.canvas_map === 0 ? true : false}
					/>
				)}
				<DynamicSelectAreaDraw />
			</MapContainer>
		</div>
	);
};

export default MapWithPlaces;
