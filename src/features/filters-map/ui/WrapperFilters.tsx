'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetFilters } from '../../../entities/place/hooks/useGetFilters';
import { useFilterInitFromUrl } from '../hooks/useFilterInitFromUrl';
import { useFilterSync } from '../hooks/useFilterSync';

import Filters from './Filters';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader/Loader';

const DynamicLoaderPortal = dynamic(
	() => import('@/shared/ui/loader/LoaderPortal').then(mod => mod.LoaderPortal),
	{ ssr: false },
);
export type FormDataFilter = {
	[key: `filter_${number}_${number}`]:
		| boolean
		| string
		| number
		| { min: number; max: number };
};

const WrapperFilters: FC = () => {
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const searchParams = useSearchParams();
	const router = useRouter();

	const [isInitialized, setIsInitialized] = useState(false);

	const { control, getValues, watch, reset, setValue } =
		useForm<FormDataFilter>({
			mode: 'onChange',
		});
	const formValues = watch(); //HELP: значения всех фильтров

	const queryString = useMemo(() => {
		const params = new URLSearchParams();
		// добавляем исходные searchParams (если нужны)
		searchParams.forEach((value, key) => params.set(key, value));

		const baseQuery =
			mapOrSeoUrl.type === 'query'
				? `map=${mapOrSeoUrl.result}`
				: `url=${mapOrSeoUrl.result}`;

		return params.toString()
			? `?${baseQuery}&${params.toString()}`
			: `?${baseQuery}`;
	}, [formValues, searchParams]);

	const {
		// data: data_map,
		refetch,
		isLoading: isLoading_data_map,
	} = useGetMapPageData(queryString);

	const { data, isLoading } = useGetFilters(mapOrSeoUrl.result);

	//HELP: Инициализация формы
	useFilterInitFromUrl(reset, setIsInitialized, data || []);
	//HELP: Синхронизация формы с URL
	useFilterSync(control, isInitialized, data || []);

	const handleReset = () => {
		reset();
		//HELP: Очистка URL параметров
		window.history.pushState({}, '', window.location.pathname);
	};
	const handleGetDataWithFilters = () => {
		console.log('queryString', queryString);
		refetch();

		if (window.screen.width <= 640) {
			const params = new URLSearchParams();
			//HELP: добавляем исходные searchParams
			searchParams.forEach((value, key) => params.set(key, value));
			console.log('tut', `/${params.toString()}`);
			router.push(`/?${params.toString()}`);
			//TODO:СБИВАЛИСЬ КВЕРИ ПАРАМЕТРЫ ПРИ ПЕРЕХОДЕ НА ГЛАВНУЮ.ВРОДЕ УЖЕ РАБОТАЕТ, НО ЗАМЕТИЛ ДРУГОЙ БАГ:ЕСЛИ ВЫБРАЛ ФИЛЬТРЫ, ПЕРЕШЕЛ НА ГЛАВНУЮ, ВЕРНУЛСЯ НА ФИЛЬТРЫ И ПОПЫТАЛСЯ СБРОСИТЬ ТО НЕ ДАËТ ИХ СБРОСИТЬ, ОБРАТНО ВОССТАНАВЛИВАЕТ. С ЭТИМ НУЖНО РАЗОБРАТЬСЯ.
			// UPD: ТОЛЬКО ЧТО ПРОВЕРИЛ И ОКАЗЫВАЕТСЯ В ПК ВЕРСИИ ТОЖЕ САМОЕ НЕ ДАЕТ СБРАСЫВАТЬ ЕСЛИ УЖЕ ПРИМЕНИЛ ФИЛЬТРЫ. ДАЖЕ БЕЗ ПЕРЕХОДА НА ДРУГУЮ СТРАНИЦУ
		}
	};

	return (
		<div className='shadow-custom-black w-full sm:w-56 xl:w-sm rounded-xl py-3 px-2 xl:py-5 xl:px-4 flex flex-col gap-3 h-full min-h-0'>
			<div className='flex items-center justify-between mb-2.5'>
				<h3 className='font-bold text-xl xl:text-[1.38rem]'>Фильтры</h3>
				<Button
					variant='icon'
					className='flex gap-1 items-center w-fit!'
					onClick={handleReset}
				>
					<Image
						src={'/images/icons/exit.svg'}
						alt='exit'
						width={16} //HELP: минимальный размер для оптимизации
						height={16} //HELP: должен быть в тех же пропорциях, что и изображение
					/>
					<span className='text-sm text-primary'>Сбросить</span>
				</Button>
			</div>
			{isLoading && <Loader />}
			<Filters filters={data || []} control={control} />
			<Button onClick={handleGetDataWithFilters}>Показать</Button>
			<DynamicLoaderPortal
				isLoading={isLoading_data_map}
				message='Применяем фильтры...'
			/>
		</div>
	);
};

export default WrapperFilters;
