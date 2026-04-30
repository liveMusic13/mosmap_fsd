'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useCrdAreaStore } from '@/entities/place';
import { useSavePlaceInfo } from '@/entities/place/hooks/useSavePlaceInfo';
import { IDetailsPlaceInfo } from '@/entities/place/types';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';
import { LoaderPortal } from '@/shared/ui/loader';

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
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const { reset, getValues } = useFormContext();

	const { mutate, isSuccess, data, isPending } = useSavePlaceInfo();
	const openView = useViewBlocksStore(store => store.openView);
	const crdArea = useCrdAreaStore(store => store.crd);
	const clearCrdArea = useCrdAreaStore(store => store.clearCrd);
	// const fullCloseView = useViewBlocksStore(store => store.fullCloseView);
	// const closeView = useViewBlocksStore(store => store.closeView);

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
			clearCrdArea();
			openView('place-info');
		}
	}, [isSuccess, data]);

	// console.log('place', place);

	const onClick = (id: number) => {
		if (id === 0) {
			if (!place) {
				console.error('Нету объекта');
				return;
			}
			const valuesForm = getValues();

			const crd = crdArea ? [crdArea.lat, crdArea.lng] : [];

			const editPlace = {
				...place,
				crd: crd,
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
							className={`${but.id === 0 ? 'h-7! w-auto!' : ''}`}
							onClick={() => onClick(but.id)}
						>
							{but.title}
						</Button>
					);
				})}
			</div>
			<LoaderPortal
				isLoading={isPending}
				message='Идет сохранение объекта...'
			/>
		</>
	);
};
