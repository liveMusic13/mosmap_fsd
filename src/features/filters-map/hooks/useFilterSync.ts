import { useEffect, useMemo, useRef } from 'react';
import { Control, useWatch } from 'react-hook-form';

import { IFiltersData } from '../types';
import { FormDataFilter } from '../ui/WrapperFilters';

import { useDebounce } from '@/shared/hooks/useDebounce';
import {
	buildListParams,
	buildMapParams,
	buildRangeParams,
	updateUrlParams,
} from '@/shared/lib/url';

export const useFilterSync = (
	control: Control<FormDataFilter>,
	isInitialized: boolean,
	filters: IFiltersData[],
) => {
	const skipFirstSync = useRef(true);
	//HELP: Создаем карту дефолтных значений
	const defaultValues = useMemo(() => {
		const defaults: Record<string, any> = {};
		filters.forEach(filter => {
			const fieldName = `filter_${filter.id}_${filter.id}`;

			if (filter.type === 'number') {
				defaults[fieldName] = {
					min: Number(filter.min_value),
					max: Number(filter.max_value),
				};
			} else if (filter.type === 'list') {
				defaults[fieldName] = undefined;
			} else if (filter.type === 'map') {
				filter.items?.forEach(item => {
					defaults[`filter_${filter.id}_${item.item_id}`] = false;
				});
			}
		});
		return defaults;
	}, [filters]);

	const formValues = useWatch({ control });
	const debouncedFormValues = useDebounce(formValues, 300);

	useEffect(() => {
		if (!isInitialized) {
			// console.log('⏸ useFilterSync SKIPPED (not initialized)');
			return;
		}

		if (skipFirstSync.current) {
			skipFirstSync.current = false;
			// console.log('⏭ SKIP FIRST SYNC');
			return;
		}

		const urlParams: Record<string, string> = {};

		// console.log('🔍 Начинаем обработку фильтров');
		// console.log('📋 Все значения формы:', debouncedFormValues);
		// console.log('🎯 Дефолтные значения:', defaultValues);

		filters.forEach(filter => {
			if (filter.type === 'number') {
				const fieldName =
					`filter_${filter.id}_${filter.id}` as keyof FormDataFilter;
				const value = debouncedFormValues[fieldName];
				const defaultValue = defaultValues[fieldName];

				if (
					value &&
					typeof value === 'object' &&
					'min' in value &&
					'max' in value
				) {
					const rangeValue = value as { min: number; max: number };
					const defaultRange = defaultValue as { min: number; max: number };

					if (
						rangeValue.min !== defaultRange?.min ||
						rangeValue.max !== defaultRange?.max
					) {
						const rangeParams = buildRangeParams(filter.name, rangeValue);
						Object.assign(urlParams, rangeParams);
					}
				}
			} else if (filter.type === 'list') {
				const fieldName =
					`filter_${filter.id}_${filter.id}` as keyof FormDataFilter;
				const value = debouncedFormValues[fieldName];
				const defaultValue = defaultValues[fieldName];

				if (value === 0) {
					// Пользователь выбрал "Не выбрано" → удаляем параметр
					// ❌ не добавляем в urlParams
				} else if (value !== undefined && value !== defaultValue) {
					const listParam = buildListParams(filter.name, value as number);
					Object.assign(urlParams, listParam);
				}

				// if (value !== undefined && value !== defaultValue) {
				// 	const listParam = buildListParams(filter.name, value as number);
				// 	Object.assign(urlParams, listParam);
				// }
			} else if (filter.type === 'map' && filter.items) {
				// console.log(
				// 	`\n📦 Обрабатываем MAP фильтр: ${filter.name} (id: ${filter.id})`,
				// );

				const selectedItemIds: number[] = [];

				filter.items.forEach(item => {
					const fieldName =
						`filter_${filter.id}_${item.item_id}` as keyof FormDataFilter;
					const value = debouncedFormValues[fieldName];
					const defaultValue = defaultValues[fieldName];

					// console.log(
					// 	`  - Чекбокс ${item.item_name} (item_id: ${item.item_id}):`,
					// 	{
					// 		fieldName,
					// 		value,
					// 		defaultValue,
					// 		isSelected: value === true && value !== defaultValue,
					// 	},
					// );

					if (value === true && value !== defaultValue) {
						selectedItemIds.push(item.item_id);
					}
				});

				// console.log(
				// 	`  ✅ Выбранные item_id для фильтра ${filter.name}:`,
				// 	selectedItemIds,
				// );

				if (selectedItemIds.length > 0) {
					const mapParam = buildMapParams(filter.name, selectedItemIds);
					// console.log(`  🔗 Добавляем в URL:`, mapParam);
					Object.assign(urlParams, mapParam);
				}
			}
		});

		// console.log('🌐 Финальные URL параметры:', urlParams);
		updateUrlParams(urlParams);
	}, [debouncedFormValues, filters, defaultValues, isInitialized]);
};
