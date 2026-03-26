'use client';

import dynamic from 'next/dynamic';
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { colorIntervalSearchParams } from '../constants';
import { useGetColorInterval } from '../hooks/useGetColorInterval';
import { useInitQueryParams } from '../hooks/useInitQueryParams';
import { useIsViewNumField } from '../hooks/useIsViewNumField';
import { useSyncFormWithUrl } from '../hooks/useSyncFormWithUrl';
import { IFormColorInterval } from '../types';

import { SelectControl } from './SelectControl';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { Loader } from '@/shared/ui/loader/Loader';

const DynamicLoaderPortal = dynamic(
	() => import('@/shared/ui/loader/LoaderPortal').then(mod => mod.LoaderPortal),
	{ ssr: false },
);

interface IProps {
	setIsViewRangeSlider: Dispatch<SetStateAction<boolean>>;
}

export const BuildPaintingOfAreas: FC<IProps> = ({ setIsViewRangeSlider }) => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const { data, isLoading, isSuccess } = useGetColorInterval(
		mapOrSeoUrl.result,
	);

	const defaultValueSelect = useMemo(
		() => ({
			[colorIntervalSearchParams.layerMap]: data?.current_sloi
				? String(data?.current_sloi)
				: '0',
			[colorIntervalSearchParams.coloringMethod]: data?.current_mode
				? String(data?.current_mode)
				: '0',
			[colorIntervalSearchParams.numberField]: data?.current_field
				? String(data?.current_field)
				: '0',
		}),
		[data],
	);
	const { control, reset } = useForm<IFormColorInterval>({
		mode: 'onChange',
		defaultValues: {
			[colorIntervalSearchParams.layerMap]:
				defaultValueSelect[colorIntervalSearchParams.layerMap],
			[colorIntervalSearchParams.coloringMethod]:
				defaultValueSelect[colorIntervalSearchParams.coloringMethod],
			[colorIntervalSearchParams.numberField]:
				defaultValueSelect[colorIntervalSearchParams.numberField],
		},
	});
	const coloringMethod = useWatch({
		control,
		name: colorIntervalSearchParams.coloringMethod,
	});

	useEffect(() => {
		if (coloringMethod) {
			//TODO:Разобраться с условием когда должны быть видны инпуты и рэнж а когда все просто рэнж
			// const isViewRangeSlider =
			// 	Number(coloringMethod) === 1 || Number(coloringMethod) === 3;
			const isViewRangeSlider = Number(coloringMethod) !== 0;
			setIsViewRangeSlider(isViewRangeSlider);
		}
	}, [coloringMethod]);

	//HELP: Обновляем дефолтные значения формы когда приходят данные
	useEffect(() => {
		if (isSuccess && data) {
			reset(defaultValueSelect);
		}
	}, [isSuccess, data, defaultValueSelect, reset]);

	const optionsSloi = useMemo(
		() =>
			data?.sloi_fields
				? [
						{ name: 'Выберите значение', value: -99 },
						...data?.sloi_fields.map(el => ({ name: el.name, value: el.id })),
					]
				: [],
		[data],
	);
	const optionsMode = useMemo(
		() =>
			data?.mode_list
				? [
						{ name: 'Выберите значение', value: -99 },
						...data?.mode_list.map(el => ({ name: el.name, value: el.id })),
					]
				: [],
		[data],
	);
	const optionsNum = useMemo(
		() =>
			data?.num_fields
				? [
						{ name: 'Выберите значение', value: -99 },
						...data?.num_fields.map(el => ({ name: el.name, value: el.id })),
					]
				: [],
		[data],
	);

	const isViewNumberField = useIsViewNumField(control);

	useInitQueryParams(isSuccess, data, defaultValueSelect);
	useSyncFormWithUrl(control);

	return (
		<>
			<div className='mb-7'>
				{isLoading && <Loader />}
				{isSuccess && (
					<div className='flex flex-col gap-2.5'>
						<SelectControl
							control={control}
							options={optionsSloi}
							name={colorIntervalSearchParams.layerMap}
						/>
						<SelectControl
							control={control}
							options={optionsMode}
							name={colorIntervalSearchParams.coloringMethod}
						/>
						{isViewNumberField && (
							<SelectControl
								control={control}
								options={optionsNum}
								name={colorIntervalSearchParams.numberField}
							/>
						)}
					</div>
				)}
			</div>
			<DynamicLoaderPortal
				isLoading={isLoading}
				message='Загружаем настройки...'
			/>
		</>
	);
};
