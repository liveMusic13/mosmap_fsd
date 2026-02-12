'use client';

import 'leaflet-draw/dist/leaflet.draw.css';
import { FC } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import { useSelectArea } from '../hooks/useSelectArea';
import { useSelectAreaStore } from '../store/selectArea.store';

export const SelectAreaDraw: FC = () => {
	const isSelectArea = useSelectAreaStore(store => store.isSelectArea);

	const { _onCreated, _onDeleted } = useSelectArea();

	if (!isSelectArea) return null;

	return (
		isSelectArea && (
			<FeatureGroup>
				<EditControl
					position='bottomright'
					onCreated={_onCreated}
					onDeleted={_onDeleted}
					draw={{
						rectangle: false,
						polyline: false,
						circle: false,
						circlemarker: false,
						marker: false,
					}}
				/>
			</FeatureGroup>
		)
	);
};
