import { FC, ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { IFiltersData } from '../types';

import { FormDataFilter } from './WrapperFilters';
import Select from '@/shared/ui/Select';
import { Checkbox } from '@/shared/ui/checkbox';
import { ControlledRange } from '@/shared/ui/range';

interface IFilterProps {
	filter: IFiltersData;
	control: Control<FormDataFilter>;
}

interface IWrapperFilterProps {
	caption: string;
	children: ReactNode;
}
/**
 *
 * @param {string} caption - название фильтра
 * @param {ReactNode} children - контент фильтра
 * @returns {ReactNode} возвращает функцию-компонент
 */
const WrapperFilter: FC<IWrapperFilterProps> = ({ caption, children }) => {
	return (
		<div>
			<h4 className='font-bold pb-1.5 border-b border-dotted border-border-dotted mb-1'>
				{caption}
			</h4>
			{children}
		</div>
	);
};

const Filter: FC<IFilterProps> = ({ filter, control }) => {
	if (filter.type === 'map') {
		return (
			<WrapperFilter caption={filter.caption}>
				<div className='max-h-32 xl:max-h-40 overflow-x-hidden overflow-y-auto scrollbar-custom flex flex-col gap-1 shadow-xs'>
					{filter.items?.map(item => (
						<Controller
							key={item.item_id}
							name={`filter_${filter.id}_${item.item_id}` as const}
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<Checkbox
									key={item.item_id}
									label={item.item_name}
									classNameLabel='text-xs'
									checked={!!value}
									onChange={e => onChange(e.target.checked)}
									onBlur={onBlur}
									ref={ref}
								/>
							)}
						/>
					))}
				</div>
			</WrapperFilter>
		);
	} else if (filter.type === 'list') {
		const filteredOptions =
			filter.items?.map(opt => ({
				name: opt.item_name,
				value: opt.item_id,
			})) ?? [];
		const options = [{ name: 'Не выбрано', value: 0 }, ...filteredOptions];

		return (
			<WrapperFilter caption={filter.caption}>
				<Controller
					name={`filter_${filter.id}_${filter.id}` as const}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							options={options}
							value={value as number | undefined}
							onChange={onChange}
						/>
					)}
				/>
			</WrapperFilter>
		);
	} else if (filter.type === 'number') {
		return (
			<WrapperFilter caption={filter.caption}>
				<Controller
					name={`filter_${filter.id}_${filter.id}` as const}
					control={control}
					defaultValue={{
						min: Number(filter?.min_value),
						max: Number(filter?.max_value),
					}}
					render={({ field: { onChange, value } }) => (
						<ControlledRange
							onChange={onChange}
							value={value as { min: number; max: number } | undefined}
							rangeBoundaries={{
								min: Number(filter?.min_value),
								max: Number(filter?.max_value),
							}}
						/>
					)}
				/>
			</WrapperFilter>
		);
	}

	return null;
};

export default Filter;
