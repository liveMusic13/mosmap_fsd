import { type LatLngExpression, divIcon } from 'leaflet';
import { FC } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker as MarkerLeaflet, Popup } from 'react-leaflet';

import { useClickPlaceInMap } from '../../hooks/useClickPlaceInMap';
import type { IPlace } from '../../types';

import { CENTER_MAP_CRD } from '@/shared/constants';
import IconMarker from '@/shared/ui/IconMarker';

interface IProp {
	mark: IPlace;
	targetId: number;
}

export const Marker: FC<IProp> = ({ mark, targetId }) => {
	const onClickPlace = useClickPlaceInMap();

	let customMarkerIcon;
	if (targetId === mark.id) {
		customMarkerIcon = divIcon({
			className: 'my-custom-icon',
			iconSize: [22, 22],
			html: renderToStaticMarkup(
				<IconMarker
					key={mark.id}
					mark={{ ...mark, icon: 'target', color: 'var(--text-red)' }}
					size={[22, 22]}
					target={true}
				/>,
			),
		});
	} else {
		customMarkerIcon = divIcon({
			className: 'my-custom-icon',
			iconSize: [22, 22],
			html: renderToStaticMarkup(
				<IconMarker key={mark.id} mark={mark} size={[22, 22]} />,
			),
		});
	}

	return (
		<MarkerLeaflet
			key={mark.id}
			position={(mark.crd as LatLngExpression) || CENTER_MAP_CRD}
			icon={customMarkerIcon}
			eventHandlers={{
				click: () => {
					onClickPlace(mark.id);
				},
			}}
		>
			<Popup>{mark.name}</Popup>
		</MarkerLeaflet>
	);
};
