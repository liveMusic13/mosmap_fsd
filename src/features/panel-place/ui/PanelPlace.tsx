'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';

import { usePopups } from '../hooks/usePopups';

import { ButtonPanel } from './ButtonPanel';
import { useCheckToken } from '@/app/providers/TokenProvider';
import { useCenterMapStore } from '@/entities/map';
import { useCrdAreaStore, useMoveMarkerStore } from '@/entities/place';
import { useGetDetailsPlace } from '@/entities/place/hooks/useGetDetailsPlace';
import { useSavePlaceInfo } from '@/entities/place/hooks/useSavePlaceInfo';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { CENTER_MAP_CRD } from '@/shared/constants';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { LoaderPortal } from '@/shared/ui/loader/LoaderPortal';

export const arrMenuPlace = [
	{
		id: 0,
		hover_text: 'Показать на карте',
		src: 'target',
	},
	{
		id: 1,
		hover_text: 'Убрать маркер',
		src: 'map-marker-remove',
	},
	{
		id: 2,
		hover_text: 'Зона доступности',
		// hover_text: 'Скоро!',
		src: 'menu-object-zone', //TODO: Разобраться с прозрачность в картинке
	},
	{
		id: 3,
		// hover_text: 'Пешеходный трафик',
		hover_text: 'Скоро!',
		src: 'menu-object-trafick',
	},
	{
		id: 4,
		// hover_text: 'База данных',
		hover_text: 'Скоро!',
		src: 'menu-object-database',
	},
];

interface IProps {
	toggleAvailabilityZone: () => void;
}

export const PanelPlace: FC<IProps> = ({ toggleAvailabilityZone }) => {
	const searchParams = useSearchParams();
	const { token } = useCheckToken();
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const { data } = useGetDetailsPlace(targetPlaceId);
	const {
		isPopup,
		setIsPopup,
		isMoveMarker,
		setIsMoveMarker,
		isSaveNewCrdMarker,
		setIsSaveNewCrdMarker,
	} = usePopups();
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const setMoveMarker = useMoveMarkerStore(store => store.setMove);
	const crdMoveMarker = useMoveMarkerStore(store => store.crd);
	const clearCrdMoveMarker = useMoveMarkerStore(store => store.clearCrd);
	const setCenterMap = useCenterMapStore(store => store.setCenterMap);
	const clearCrdAreaMarker = useCrdAreaStore(store => store.clearCrd);

	const { mutate, isSuccess, data: data_delete_crd } = useSavePlaceInfo();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { refetch, isLoading } = useGetMapPageData(queryString);

	useEffect(() => {
		if (isSuccess) {
			refetch();
		}
	}, [isSuccess, data_delete_crd]);

	const onClick = (butId: number) => {
		if (butId === 0) {
			setCenterMap(data?.crd || CENTER_MAP_CRD);
		} else if (butId === 1) {
			setIsPopup(true);
		} else if (butId === 2) {
			toggleAvailabilityZone();
		}
	};

	const handleDeleteCrd = () => {
		if (!data) return;
		const queryParams =
			mapOrSeoUrl.type === 'query'
				? `?map=${mapOrSeoUrl.result}`
				: `?url=${mapOrSeoUrl.result}`;
		const editPlace = {
			...data,
			crd: [null, null] as unknown as number[],
		};
		mutate({ queryParams, place: editPlace });
		setIsPopup(false);
	};

	const handleMoveMarker = () => {
		setIsMoveMarker(true);
		setIsPopup(false);
		setMoveMarker(true);
	};
	const handleSaveNewCrdMarker = () => {
		if (!data || !crdMoveMarker) return;
		const queryParams =
			mapOrSeoUrl.type === 'query'
				? `?map=${mapOrSeoUrl.result}`
				: `?url=${mapOrSeoUrl.result}`;
		const editPlace = {
			...data,
			crd: crdMoveMarker,
		};
		mutate({ queryParams, place: editPlace });
		setIsSaveNewCrdMarker(false);
		clearCrdMoveMarker();
		clearCrdAreaMarker();
	};
	const handleBackNewCrd = () => {
		setIsSaveNewCrdMarker(false);
		clearCrdMoveMarker();
	};

	return (
		<>
			<div className='flex items-center justify-between'>
				{arrMenuPlace.map(but => (
					<ButtonPanel
						key={but.id}
						hover_text={but.hover_text}
						src={but.src}
						position='left'
						isDisabled={
							(!token && but.id === 1) || but.id === 3 || but.id === 4
						}
						onClick={() => onClick(but.id)}
					/>
				))}
			</div>
			<Popup open={isPopup} onClose={() => setIsPopup(false)}>
				<div>
					<p className='font-bold mb-2'>
						Вы хотите удалить или переместить маркер?
					</p>
					<div className='flex items-center justify-center gap-2'>
						<Button
							variant='green'
							className='w-fit! h-7!'
							onClick={handleMoveMarker}
						>
							Переместить
						</Button>
						<Button
							variant='green'
							className='w-fit! h-7!'
							onClick={() => setIsPopup(false)}
						>
							Назад
						</Button>
						<Button
							variant='transparent'
							className='w-fit! h-7! text-text-red'
							onClick={handleDeleteCrd}
						>
							Удалить
						</Button>
					</div>
				</div>
			</Popup>
			<Popup open={isMoveMarker} onClose={() => setIsMoveMarker(false)}>
				<div className='max-w-xl'>
					<p className='font-bold mb-2'>
						Выберите любое место на карте и нажмите на него. Когда установите,
						нажмите правой кнопкой мыши в любое место чтобы закончить смену
						координат для маркера.
					</p>
					<div className='flex items-center justify-center'>
						<Button
							variant='green'
							className='w-fit! h-7!'
							onClick={() => setIsMoveMarker(false)}
						>
							Назад
						</Button>
					</div>
				</div>
			</Popup>
			<Popup
				open={isSaveNewCrdMarker}
				onClose={() => setIsSaveNewCrdMarker(false)}
			>
				<div className='max-w-xl'>
					<p className='font-bold mb-2 gap-2'>
						Вы уверены что хотите изменить координаты маркера?
					</p>
					<div className='flex items-center justify-center'>
						<Button className='w-fit! h-7!' onClick={handleSaveNewCrdMarker}>
							Подтвердить
						</Button>
						<Button
							variant='transparent-red'
							className='w-fit! h-7!'
							onClick={handleBackNewCrd}
						>
							Отменить
						</Button>
					</div>
				</div>
			</Popup>
			<LoaderPortal isLoading={isLoading} message='Обновляем данные...' />
		</>
	);
};
