import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { IPlaceDetail, TElPlaceInfo } from '../../types';

import { IFilterItem } from '@/features/filters-map/types';
import Select from '@/shared/ui/Select';
import { Input } from '@/shared/ui/fields';

interface IProps extends IPlaceDetail {
	el: TElPlaceInfo;
	options?: IFilterItem[] | undefined;
}

export const EditPlaceDetail: FC<IProps> = ({ title, value, el, options }) => {
	const { register, control } = useFormContext();

	if (el === 'input') {
		return (
			<Input label={title} className='text-primary' {...register(title)} />
		);
	} else if (el === 'select') {
		const transformOptions =
			options?.map(opt => ({ name: opt.item_name, value: opt.item_id })) || [];

		return (
			<div>
				<h4 className='font-bold pb-1.5 border-b border-dotted border-border-dotted mb-1'>
					{title}
				</h4>
				<Controller
					name={title}
					control={control}
					render={({ field: { onChange, value: value_control } }) => (
						<Select
							options={transformOptions}
							value={value_control as number | undefined}
							onChange={onChange}
						/>
					)}
				/>
			</div>
		);
	}
	return null;
};
