import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSavePlaceInfo } from '@/entities/place/hooks/useSavePlaceInfo';
import { IDetailsPlaceInfo } from '@/entities/place/types';
import { useGetMapPageData } from '@/shared/hooks/useGetMapPageData';
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
];

interface IProps {
	place: IDetailsPlaceInfo | undefined;
}

export const ButtonsCreate: FC<IProps> = ({ place }) => {
	const [isPopup, setIsPopup] = useState(false);
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const { reset, getValues } = useFormContext();

	const { mutate, isSuccess, data } = useSavePlaceInfo();

	const searchParams = useSearchParams();

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { refetch } = useGetMapPageData(queryString);

	useEffect(() => {
		if (isSuccess) {
			refetch();
		}
	}, [isSuccess, data]);

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
		}
	};

	return (
		<>
			<div className='flex items-center justify-center flex-wrap xl:justify-between gap-2'>
				{buttons.map(but => {
					const variant = but.id === 1 ? 'transparent-gray' : 'green';

					return (
						<Button
							key={but.id}
							variant={variant}
							className={`${but.id === 0 ? 'h-7! w-fit!' : ''}`}
							onClick={() => onClick(but.id)}
						>
							{but.title}
						</Button>
					);
				})}
			</div>
			<Popup open={isPopup} onClose={() => setIsPopup(false)}>
				<div>
					<p className='font-bold mb-2'>
						Выберите любое место на карте и нажмите на него. Когда установите,
						нажмите правой кнопкой мыши в любое место чтобы закончить установку
						координат для маркера.
					</p>
					<div className='flex items-center justify-center'>
						<Button
							variant='green'
							className='w-fit! h-7!'
							onClick={() => setIsPopup(false)}
						>
							Понятно
						</Button>
					</div>
				</div>
			</Popup>
		</>
	);
};
