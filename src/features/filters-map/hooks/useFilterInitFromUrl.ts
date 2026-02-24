import { Dispatch, SetStateAction, useEffect } from 'react';

import { IFiltersData } from '../types';
import { FormDataFilter } from '../ui/WrapperFilters';

export const useFilterInitFromUrl = (
	reset: (values?: FormDataFilter) => void,
	setIsInitialized: Dispatch<SetStateAction<boolean>>,
	isInitialized: boolean, // <-- Добавляем это состояние
	filters: IFiltersData[],
) => {
	useEffect(() => {
		// 1. Ждем, пока придут фильтры
		// 2. Если уже инициализированы, блокируем повторный запуск (защита от race condition)
		if (!filters.length || isInitialized) return;

		const searchParams = new URLSearchParams(window.location.search);
		const initialValues: FormDataFilter = {} as FormDataFilter;

		filters.forEach(filter => {
			// Логика NUMBER
			if (filter.type === 'number') {
				const from = searchParams.get(`num_from[${filter.id}]`);
				const to = searchParams.get(`num_to[${filter.id}]`);
				if (from || to) {
					initialValues[`filter_${filter.id}_${filter.id}`] = {
						min: from ? Number(from) : Number(filter.min_value),
						max: to ? Number(to) : Number(filter.max_value),
					};
				}
			}

			// Логика LIST
			if (filter.type === 'list') {
				const val = searchParams.get(filter.name);
				if (val)
					initialValues[`filter_${filter.id}_${filter.id}`] = Number(val);
			}

			// Логика MAP
			if (filter.type === 'map' && filter.items) {
				const val = searchParams.get(filter.name);
				const ids = val ? val.split(',').map(Number) : [];
				filter.items.forEach(item => {
					initialValues[`filter_${filter.id}_${item.item_id}`] = ids.includes(
						item.item_id,
					);
				});
			}
		});

		// Сбрасываем форму к начальным значениям URL
		reset(initialValues);

		// Помечаем, что первичная настройка завершена
		setIsInitialized(true);
	}, [filters, isInitialized, reset, setIsInitialized]);
};

// export const useFilterInitFromUrl = (
// 	reset: (values?: FormDataFilter) => void,
// 	setIsInitialized: Dispatch<SetStateAction<boolean>>,
// 	filters: IFiltersData[],
// ) => {
// 	useEffect(() => {
// 		if (!filters.length) return;

// 		const searchParams = new URLSearchParams(window.location.search);
// 		const initialValues: FormDataFilter = {} as FormDataFilter;

// 		filters.forEach(filter => {
// 			// NUMBER
// 			if (filter.type === 'number') {
// 				const from = searchParams.get(`num_from[${filter.id}]`);
// 				const to = searchParams.get(`num_to[${filter.id}]`);

// 				if (from || to) {
// 					initialValues[`filter_${filter.id}_${filter.id}`] = {
// 						min: from ? Number(from) : Number(filter.min_value),
// 						max: to ? Number(to) : Number(filter.max_value),
// 					};
// 				}
// 			}

// 			// LIST
// 			if (filter.type === 'list') {
// 				const val = searchParams.get(filter.name);
// 				if (val) {
// 					initialValues[`filter_${filter.id}_${filter.id}`] = Number(val);
// 				}
// 			}

// 			// MAP
// 			if (filter.type === 'map' && filter.items) {
// 				const val = searchParams.get(filter.name);
// 				const ids = val ? val.split(',').map(Number) : [];

// 				filter.items.forEach(item => {
// 					initialValues[`filter_${filter.id}_${item.item_id}`] = ids.includes(
// 						item.item_id,
// 					);
// 				});
// 			}
// 		});
// 		// console.log('initialValues', initialValues);
// 		// ❗ Используем reset вместо множества setValue
// 		reset(initialValues);
// 		setIsInitialized(true);
// 	}, [filters, reset, setIsInitialized]);
// };
