import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';

import { useCrdAreaStore } from '@/entities/place';
import { useMoveMarkerStore } from '@/entities/place/store/moveMarker.store';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { useCrdCreatePlaceStore } from '@/features/create-place';
import { useSelectAreaStore } from '@/features/select-area';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';

//HELP:Здесь обрабатываются клики по карте , но не по объектам
export const MapClickHandler: FC = () => {
	const isMoveMarker = useMoveMarkerStore(store => store.isMove);
	const setMoveMarker = useMoveMarkerStore(store => store.setMove);
	const setCrdMarker = useMoveMarkerStore(store => store.setCrd);
	const clearTargetPlaceId = useTargetPlaceIdStore(store => store.clearId);
	const setAreaCrd = useCrdAreaStore(store => store.setCrd);
	const openView = useViewBlocksStore(store => store.openView);
	const setCrdCreatePlace = useCrdCreatePlaceStore(store => store.setCrd);
	const view = useViewBlocksStore(store => store.view);
	const isSelectArea = useSelectAreaStore(store => store.isSelectArea);

	useMapEvents({
		click: async e => {
			if (!isMoveMarker) {
				clearTargetPlaceId();
				if (!isSelectArea) {
					// 	setAreaCrd({ lat: e.latlng.lat, lng: e.latlng.lng });//HELP: здесь ставить если не надо чтобы маркер зоны появлялся при перемещении маркера у какого-то объекта
					openView('area-info');
				}
			} else {
				setCrdMarker([e.latlng.lat, e.latlng.lng]);
			}
			if (!isSelectArea) {
				setAreaCrd({ lat: e.latlng.lat, lng: e.latlng.lng }); //HELP: здесь ставить если надо чтобы маркер зоны появлялся при перемещении маркера у какого-то объекта
			}
			if (view === 'create-place') {
				setCrdCreatePlace({ lat: e.latlng.lat, lng: e.latlng.lng });
			}
		},
		contextmenu: e => {
			if (isMoveMarker) {
				e.originalEvent.preventDefault();
				console.log('Клик правой кнопкой:', e.latlng);
				setMoveMarker(false);
			}
		},
	});

	return null;
};
