'use client';

import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { useImportLoad } from '../hooks/useImportLoad';
import { useImportLoadStore } from '../store/import.store';
import { IImportForm } from '../types';

import { TitleItemForm } from './TitleItemForm';
import { dataEncoding } from '@/shared/data/import-export.data';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import { truncateDescription } from '@/shared/lib/text';
import Button from '@/shared/ui/Button';
import Select from '@/shared/ui/Select';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

export const ImportForm: FC = () => {
	const router = useRouter();

	const map = useGetMapForOtherPage();
	const { mutateAsync, isError, error, isPending } = useImportLoad();
	const addImportLoadData = useImportLoadStore(store => store.addData);

	const { register, control, handleSubmit } = useForm<IImportForm>({
		mode: 'onChange',
		defaultValues: {
			encoding: 1,
			separator: ';',
		},
	});

	const options = useMemo(
		() => [
			{ name: 'Не выбрано', value: 0 },
			...dataEncoding.map((el, ind) => ({ name: el, value: ind + 1 })),
		],
		[],
	);
	const { encoding, file, separator } = useWatch<IImportForm>({ control });
	console.log(encoding);
	const nameFile = file;
	const disabledButton = !encoding || !file || !separator;

	const onSubmit = async (data: IImportForm) => {
		const typesFile = typeof data.file === 'undefined' ? null : data.file;

		if (typesFile) {
			const result = await mutateAsync({
				map,
				encoding: dataEncoding[data.encoding],
				file: typesFile,
				separator: String(data.separator),
			});

			addImportLoadData(result);

			router.push(`/import/done`);
		}
	};

	return (
		<>
			<form
				className='bg-light-blue rounded-lg p-4 flex flex-col gap-6 sm:gap-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='relative flex items-center justify-between gap-2'>
					<Controller
						name='file'
						control={control}
						rules={{
							required: 'Файл обязателен',
						}}
						render={({ field: { onChange, value, ...field } }) => (
							<input
								{...field}
								type='file'
								className='w-full h-full opacity-0 z-30 absolute cursor-pointer'
								onChange={e => {
									const file = e.target.files?.[0];
									onChange(file);
								}}
							/>
						)}
					/>
					<Button className='w-40! whitespace-nowrap'>Выбрать файл</Button>
					<p className='rounded-md w-full text-xs border border-border-gray/30 bg-white py-2 px-2'>
						{truncateDescription(nameFile?.name ?? 'Нету файла', 29)}
					</p>
				</div>
				<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />

				<div className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-2'>
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
				<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />

				<Button disabled={disabledButton}>Загрузить</Button>
				{isError && <p className='text-text-red'>{error.message}</p>}
			</form>
			<LoaderPortal isLoading={isPending} message='Отправка данных...' />
		</>
	);
};
