'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDeletePlace } from '@/entities/place/hooks/useDeletePlace';
import { useSavePlaceInfo } from '@/entities/place/hooks/useSavePlaceInfo';
import { IDetailsPlaceInfo } from '@/entities/place/types';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';

const buttons = [
	{
		id: 0,
		title: 'Сохранить',
	},
	{
		id: 1,
		title: 'Отменить',
	},
	{
		id: 2,
		title: 'Удалить',
	},
];

interface IProps {
	place: IDetailsPlaceInfo | undefined;
	targetPlaceId: number | null;
}

export const ButtonsEdit: FC<IProps> = ({ place, targetPlaceId }) => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const [isPopup, setIsPopup] = useState(false);
	const { reset, getValues } = useFormContext();

	const { mutate, isSuccess, data } = useSavePlaceInfo();
	const {
		mutate: mutate_delete,
		isSuccess: isSuccess_delete,
		data: data_delete,
	} = useDeletePlace();

	const searchParams = useSearchParams();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { refetch } = useGetMapPageData(queryString);

	useEffect(() => {
		if (isSuccess || isSuccess_delete) {
			refetch();
		}
	}, [isSuccess, data, isSuccess_delete, data_delete]);

	const onClick = (id: number) => {
		if (id === 0) {
			if (!place) {
				console.error('Нету объекта');
				return;
			}
			const valuesForm = getValues();

			const editPlace = {
				...place,
				values: place.values.map(info => ({
					...info,
					value: valuesForm[info.label] ?? info.value,
				})),
			};

			const queryParams =
				mapOrSeoUrl.type === 'query'
					? `?map=${mapOrSeoUrl.result}`
					: `?url=${mapOrSeoUrl.result}`;
			mutate({ place: editPlace, queryParams });
		} else if (id === 1) {
			reset();
		} else if (id === 2 && targetPlaceId) {
			setIsPopup(true);
		}
	};

	const handleDeletePlace = () => {
		if (targetPlaceId) {
			mutate_delete(targetPlaceId);
			setIsPopup(false);
		}
	};

	return (
		<>
			<div className='flex items-center justify-center flex-wrap xl:justify-between gap-1'>
				{buttons.map(but => {
					const variant =
						but.id === 1
							? 'transparent-gray'
							: but.id === 2
								? 'transparent-red'
								: 'green';

					return (
						<Button
							key={but.id}
							variant={variant}
							className={`${but.id === 0 ? 'h-7! w-auto!' : ''}`}
							onClick={() => onClick(but.id)}
						>
							{but.title}
						</Button>
					);
				})}
			</div>
			<Popup open={isPopup} onClose={() => setIsPopup(false)}>
				<div>
					<p className='font-bold mb-2'>Вы действительно хотите удалить?</p>
					<div className='flex items-center justify-center gap-2'>
						<Button
							variant='transparent'
							className='w-auto! h-7! text-text-red'
							onClick={handleDeletePlace}
						>
							Удалить
						</Button>
						<Button
							variant='green'
							className='w-auto! h-7!'
							onClick={() => setIsPopup(false)}
						>
							Назад
						</Button>
					</div>
				</div>
			</Popup>
		</>
	);
};
