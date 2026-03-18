'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';

import { useCenterMapStore } from '@/entities/map';
import { PlaceListItem } from '@/entities/place';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { IPlace } from '@/entities/place/types';
import { useSelectAreaLayersStore } from '@/features/select-area';
import { isMarkerInsideSelectArea } from '@/features/select-area/lib/helpers';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';
import { Input } from '@/shared/ui/fields';
import { Loader } from '@/shared/ui/loader/Loader';

const ESTIMATED_ROW_HEIGHT = 48;

const ListPlaces: FC = () => {
	const router = useRouter();
	const parentRef = useRef<HTMLDivElement>(null);
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const setCenterMap = useCenterMapStore(store => store.setCenterMap);
	const setTargetId = useTargetPlaceIdStore(store => store.setTargetId);
	const searchParams = useSearchParams();
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const openView = useViewBlocksStore(store => store.openView);
	const arrayPolygons = useSelectAreaLayersStore(store => store.arrayPolygons);
	const indexTargetPolygon = useSelectAreaLayersStore(
		store => store.indexTargetPolygon,
	);

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);

	const { data, isSuccess, isLoading } = useGetMapPageData(queryString);
	const [search, setSearch] = useState<string>('');

	const objectsInSelectArea = useMemo(() => {
		if (!data?.points) return [];
		if (arrayPolygons.length === 0) return data?.points;
		return data?.points.filter(marker =>
			isMarkerInsideSelectArea(marker, arrayPolygons[indexTargetPolygon || 0]),
		);
	}, [data?.points, arrayPolygons, indexTargetPolygon]);

	const filteredData = useMemo(() => {
		const query = search.toLowerCase();
		return objectsInSelectArea.filter(p =>
			String(p.name)?.toLowerCase().includes(query),
		);
	}, [objectsInSelectArea, search]);

	const targetIndex = useMemo(() => {
		if (!targetPlaceId) return -1;

		return filteredData.findIndex(p => p.id === targetPlaceId);
	}, [filteredData, targetPlaceId]);

	const allPlaces = filteredData?.length ?? 0;
	const placesInMap = useMemo(() => {
		if (!data?.points) return [];

		return data.points.filter(el => el.crd || el.polygon.length > 0).length;
	}, [filteredData]);

	const rowVirtualizer = useVirtualizer({
		count: filteredData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => ESTIMATED_ROW_HEIGHT,
		overscan: 8,
	});

	useEffect(() => {
		if (targetIndex < 0) return;

		rowVirtualizer.scrollToIndex(targetIndex, {
			align: 'center',
		});
	}, [targetIndex, rowVirtualizer]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);
	const handleClick = (place: IPlace) => {
		if (window !== undefined && window.innerWidth <= 640) {
			router.push('/');
		}
		setTargetId(place.id);
		setCenterMap(place.crd);
		openView('place-info');
	};

	return (
		<div className='w-full sm:w-auto sm:min-w-3xs sm:max-w-2xs xl:min-w-sm xl:max-w-md rounded-xl shadow-custom-black pt-3 px-2 xl:pt-5 xl:px-4 flex flex-col max-h-full sm:max-h-none sm:h-full'>
			<div className='shrink-0 border-b border-dotted border-border-dotted pb-1.5'>
				<h3 className='font-bold text-xl xl:text-[1.38rem] mb-2.5'>
					Список объектов
				</h3>
				<div>
					<p className='font-bold text-xs xl:text-sm flex items-center justify-between'>
						<span>Всего объектов в списке:</span>
						<span>{allPlaces}</span>
					</p>
					<p className='font-bold text-xs xl:text-sm flex items-center justify-between'>
						<span>Всего объектов на карте:</span>
						<span>{placesInMap}</span>
					</p>
				</div>
			</div>
			{isLoading && <Loader />}
			<div className='mt-2 border border-b-0 border-text-disabled rounded-t-xl flex-1 min-h-0 pt-2.5 px-2.5 flex flex-col'>
				<div className='shrink-0'>
					<Input
						placeholder='Поиск'
						fullWidth
						value={search}
						onChange={onChange}
					/>
				</div>

				<div
					ref={parentRef}
					className='mt-2 flex-1 min-h-0 overflow-auto scrollbar-custom'
				>
					{isSuccess && (
						<div
							style={{
								height: rowVirtualizer.getTotalSize(),
								position: 'relative',
							}}
						>
							{rowVirtualizer.getVirtualItems().map(virtualRow => {
								const item = filteredData[virtualRow.index];

								return (
									<div
										key={virtualRow.key}
										data-index={virtualRow.index}
										ref={rowVirtualizer.measureElement}
										className='absolute top-0 left-0 w-full'
										style={{
											transform: `translateY(${virtualRow.start}px)`,
										}}
									>
										<PlaceListItem
											place={item}
											isTarget={targetIndex === virtualRow.index}
											onClick={() => handleClick(item)}
										/>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ListPlaces;
