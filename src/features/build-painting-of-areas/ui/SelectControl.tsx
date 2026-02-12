'use client';

import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { ISelectOptions } from '@/shared/types/shared.type';
import Select from '@/shared/ui/Select';

interface IProps {
	control: Control<any>;
	options: ISelectOptions[];
	name: string;
}

export const SelectControl: FC<IProps> = ({ control, options, name }) => {
	return (
		<div>
			<h2 className='mb-1 font-bold'>{name}</h2>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value: value_control } }) => (
					<Select
						options={options}
						value={value_control as number | undefined}
						onChange={onChange}
					/>
				)}
			/>
		</div>
	);
};
