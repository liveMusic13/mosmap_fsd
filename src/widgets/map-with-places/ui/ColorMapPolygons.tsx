import { LatLngExpression } from 'leaflet';
import { FC } from 'react';
import { Polygon } from 'react-leaflet';

import { useGetColorMap } from '@/features/build-painting-of-areas/hooks/useGetColorMap';
import { useGetIntervalSearchParams } from '@/features/build-painting-of-areas/hooks/useGetIntervalSearchParams';
import { useColorMapParamsStore } from '@/features/build-painting-of-areas/store/colorMap.store';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { useViewPaintingOfAreaStore } from '@/shared/store/panelOptions.store';

const ColorMapPolygons: FC = () => {
	const urlParams = useGetIntervalSearchParams();
	const mapOrSeoUrl = useGetSeoOrQueryParam();

	const storedParams = useColorMapParamsStore();
	// Если в сторе есть сохранённые параметры — используем их,
	// иначе берём из URL как обычно
	const sloi = storedParams.sloi || urlParams.sloi;
	const type = storedParams.type || urlParams.type;
	const fieldId = storedParams.fieldId || urlParams.fieldId;
	const mapParam = storedParams.mapParam || mapOrSeoUrl.result;

	const { data, isSuccess } = useGetColorMap(mapParam, sloi, type, fieldId);
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);

	console.log(isViewPaintingOfArea, data?.length, isSuccess);

	return (
		isViewPaintingOfArea &&
		isSuccess &&
		data.length > 0 &&
		data.map((el, ind) => (
			<Polygon
				key={ind}
				positions={el.polygon as LatLngExpression[]}
				color={el.color}
				fillOpacity={0.4}
			/>
		))
	);
};

export default ColorMapPolygons;
