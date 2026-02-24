'use client';

import { FC, useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { useExportDone } from '../hooks/useExportDone';
import { IExportForm } from '../types';

import { TitleItemForm } from './TitleItemForm';
import { API_URL } from '@/shared/constants';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import Button from '@/shared/ui/Button';
import Select from '@/shared/ui/Select';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

const dataEncoding = ['UTF-8', 'Windows-1251'];

export const ExportForm: FC = () => {
	const map = useGetMapForOtherPage();

	const { register, control, handleSubmit } = useForm<IExportForm>({
		mode: 'onChange',
		defaultValues: {
			encoding: 1,
			separator: ';',
			uploadfile: 'test.csv',
			addCoordinate: false,
			house_id: false,
		},
	});

	const { mutate, data, isSuccess, isPending } = useExportDone();

	const { encoding, uploadfile, separator } = useWatch({ control });

	useEffect(() => {
		if (isSuccess && data) {
			if (data.OK) {
				const modifiedLink = data.filename.slice(2);
				window.open(`${API_URL}${modifiedLink}`, '_blank');
			}
		}
	}, [isSuccess, data]);

	const options = useMemo(
		() => [
			{ name: 'Не выбрано', value: 0 },
			...dataEncoding.map((el, ind) => ({ name: el, value: ind + 1 })),
		],
		[],
	);

	const onSubmit = (data: IExportForm) => {
		const editData = {
			...data,
			encoding: dataEncoding[data.encoding - 1],
		};

		mutate({ map, data: editData });
	};

	const disabledButton = !encoding || !uploadfile || !separator;

	return (
		<>
			<form
				className='bg-light-blue rounded-lg p-4 flex flex-col gap-6 sm:gap-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<TitleItemForm title='Имя файла'>
					<div className='block sm:hidden'>
						<Input
							fullWidth
							className='bg-white text-xs'
							{...register('uploadfile')}
						/>
					</div>
					<div className='hidden sm:block'>
						<Input className='bg-white text-xs' {...register('uploadfile')} />
					</div>
				</TitleItemForm>
				<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />

				<div className='flex flex-col gap-6 sm:flex-row items-center justify-between sm:gap-2'>
					<TitleItemForm title='Разделитель'>
						<div className='block sm:hidden'>
							<Input
								fullWidth
								className='bg-white text-xs'
								{...register('separator', {
									required: 'Это поле обязательно',
								})}
							/>
						</div>
						<div className='hidden sm:block'>
							<Input
								fullWidth
								className='bg-white text-xs'
								{...register('separator', {
									required: 'Это поле обязательно',
								})}
							/>
						</div>
					</TitleItemForm>
					<TitleItemForm title='Кодировка'>
						<Controller
							name={'encoding'}
							control={control}
							render={({ field: { onChange, value } }) => (
								<Select
									classSelect='rounded-lg! '
									classText='h-5! flex items-center mr-1'
									options={options}
									value={value as number | undefined}
									onChange={onChange}
								/>
							)}
						/>
					</TitleItemForm>
				</div>
				<Controller
					name='addCoordinate'
					control={control}
					render={({ field: { onChange, value, ref } }) => (
						<Checkbox
							label='Добавить координаты'
							classNameLabel='text-xs'
							checked={!!value}
							onChange={onChange}
							ref={ref}
						/>
					)}
				/>
				<Controller
					name='house_id'
					control={control}
					render={({ field: { onChange, value, ref } }) => (
						<Checkbox
							label='Добавить ID дома'
							classNameLabel='text-xs'
							checked={!!value}
							onChange={onChange}
							ref={ref}
						/>
					)}
				/>

				<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />
				<Button disabled={disabledButton}>Выгрузить</Button>
			</form>
			<LoaderPortal isLoading={isPending} message='Выгрузка данных...' />
		</>
	);
};
