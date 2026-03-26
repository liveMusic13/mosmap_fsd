'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useActiveInterval } from '../hooks/useActiveInterval';
import { useGetColorInterval } from '../hooks/useGetColorInterval';
import { useGetColorMap } from '../hooks/useGetColorMap';
import { useGetIntervalSearchParams } from '../hooks/useGetIntervalSearchParams';
import { useSaveColorInterval } from '../hooks/useSaveColorInterval';
import { useColorMapParamsStore } from '../store/colorMap.store';
import { TRangeFormValues } from '../types';

import { BuildPaintingOfAreas } from './BuildPaintingOfAreas';
import { RangeSlider } from './RangeSlider';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { keepOnlyFirstHash } from '@/shared/lib/colors';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader';

const DynamicLoaderPortal = dynamic(
	() => import('@/shared/ui/loader/LoaderPortal').then(mod => mod.LoaderPortal),
	{ ssr: false },
);

export const WrapperPaintingOfAreas: FC = () => {
	const router = useRouter();
	const { control, setValue, handleSubmit } = useForm<TRangeFormValues>({
		defaultValues: {
			ranges: [],
		},
	});
	const [isViewRangeSlider, setIsViewRangeSlider] = useState(false);

	const setParams = useColorMapParamsStore(store => store.setParams);

	const { fieldId, sloi, type } = useGetIntervalSearchParams();
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const { data, isLoading, isSuccess } = useGetColorInterval(
		mapOrSeoUrl.result,
	);
	const {
		mutate,
		data: data_saveInterval,
		isSuccess: isSuccess_saveInterval,
		isPending: isPending_saveInterval,
	} = useSaveColorInterval();
	const { isFetching: isFetching_colorMap, refetch } = useGetColorMap(
		mapOrSeoUrl.result,
		sloi,
		type,
		fieldId,
	);

	const activeInterval = useActiveInterval(data?.intervals);

	// Когда activeInterval меняется — сбрасываем форму ranges
	useEffect(() => {
		if (activeInterval?.values?.length) {
			setValue(
				'ranges',
				activeInterval.values.map(v => ({
					min: v.min,
					max: v.max,
					color: `#${v.color}`, // цвет приходит без #
				})),
			);
		} else {
			setValue('ranges', []);
		}
	}, [activeInterval, setValue]);

	useEffect(() => {
		const updateAndRedirect = async () => {
			if (!isSuccess_saveInterval) return;

			const result = await refetch();
			console.log('refetch result:', result.status, result.data);
			// Редиректим только после того как данные реально пришли
			if (result.status === 'success') {
				if (typeof window !== 'undefined' && window.innerWidth <= 640) {
					setParams({
						mapParam: mapOrSeoUrl.result,
						sloi,
						type,
						fieldId,
					});

					router.push('/');
				}
			}
		};

		updateAndRedirect();
	}, [isSuccess_saveInterval, refetch, router]);

	// useEffect(() => {
	// 	const updateAndRedirect = async () => {
	// 		if (isSuccess_saveInterval) {
	// 			// 1. Ждем, пока данные реально обновятся
	// 			await refetch();

	// 			// 2. Выполняем логику редиректа
	// 			if (typeof window !== 'undefined' && window.innerWidth <= 640) {
	// 				router.push('/');
	// 			}
	// 		}
	// 	};

	// 	updateAndRedirect();
	// }, [isSuccess_saveInterval, refetch, router]);

	const onSubmit = (data: TRangeFormValues) => {
		console.log(data, activeInterval);
		if (activeInterval)
			mutate({
				mapParam: mapOrSeoUrl.result,
				body: {
					...activeInterval,
					values: data.ranges.map(el => ({
						...el,
						color: keepOnlyFirstHash(el.color),
					})),
				},
			});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5 flex-1 overflow-x-hidden overflow-y-auto scrollbar-custom'
			>
				<BuildPaintingOfAreas setIsViewRangeSlider={setIsViewRangeSlider} />
				{isViewRangeSlider && (
					<RangeSlider
						control={control}
						setValue={setValue}
						maxValue={activeInterval?.max_value ?? 1000}
					/>
				)}
				{(isPending_saveInterval || isFetching_colorMap) && <Loader />}
				<Button
					type='submit'
					className='min-h-12 text-sm! sm:text-xs! sm:min-h-8'
					style={{ touchAction: 'manipulation' }}
					disabled={isLoading || isPending_saveInterval || isFetching_colorMap}
				>
					Применить
				</Button>
			</form>
			<DynamicLoaderPortal
				isLoading={isPending_saveInterval}
				message='Сохраняем настройки закраски...'
			/>
			<DynamicLoaderPortal
				isLoading={isFetching_colorMap}
				message='Закрашиваем районы...'
			/>
		</>
	);
};
