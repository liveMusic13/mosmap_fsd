import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { RangeFormValues } from '../types';

import { BuildPaintingOfAreas } from './BuildPaintingOfAreas';
import { RangeSlider } from './RangeSlider';
import Button from '@/shared/ui/Button';

export const WrapperPaintingOfAreas: FC = () => {
	const { control, setValue, handleSubmit } = useForm<RangeFormValues>({
		defaultValues: {
			ranges: [
				// { min: 0, max: 250 },
				// { min: 251, max: 500 },
				// { min: 501, max: 750 },
			],
		},
	});

	const onSubmit = (data: RangeFormValues) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 flex-1 overflow-x-hidden overflow-y-auto scrollbar-custom'
		>
			<BuildPaintingOfAreas />
			<RangeSlider control={control} setValue={setValue} />
			<Button type='submit'>Применить</Button>
		</form>
	);
};
