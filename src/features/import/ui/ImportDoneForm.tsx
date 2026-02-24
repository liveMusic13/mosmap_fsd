'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useImportDone } from '../hooks/useImportDone';
import { useImportLoadStore } from '../store/import.store';
import { TImportDoneForm } from '../types';

import { TitleItemForm } from './TitleItemForm';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import Select from '@/shared/ui/Select';
import { Checkbox } from '@/shared/ui/checkbox';
import { LoaderPortal } from '@/shared/ui/loader';

export const ImportDoneForm: FC = () => {
	const router = useRouter();
	const {
		encoding,
		file_field,
		list_field,
		separator,
		text_field,
		uploadfile,
	} = useImportLoadStore();
	const map = useGetMapForOtherPage();
	const { mutate, isSuccess, isPending, data, isError, error } =
		useImportDone();

	const { control, handleSubmit } = useForm<TImportDoneForm>({
		mode: 'onChange',
	});

	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (isSuccess) {
			setIsOpen(true);
		}
	}, [isSuccess, data]);

	const onSubmit = async (data: any) => {
		const formattedData: Record<string, string> = {
			encoding,
			separator,
			uploadfile: uploadfile,
		};

		Object.keys(text_field).forEach(id => {
			const val = data[id];
			// Если val не определен или индекс 0 ("Не загружать"), пишем "-1"
			// Если выбран индекс > 0, вычитаем 1, чтобы получить индекс из file_field
			formattedData[`fill_text[${id}]`] =
				val === undefined || Number(val) === 0 ? '-1' : String(Number(val) - 1);
		});

		// Обрабатываем списки
		Object.keys(list_field).forEach(id => {
			const val = data[id];
			formattedData[`fill_list[${id}]`] =
				val === undefined || Number(val) === 0 ? '-1' : String(Number(val) - 1);
		});

		// 2. Обрабатываем фиксированные поля (Идентификатор, Координаты)
		// Здесь значение "Нет" (индекс 0) становится "-1", остальное -1
		const staticFields: Record<string, string> = {
			Идентификатор: 'identificator',
			Широта: 'lat',
			Долгота: 'lng',
			'ID дома mosmap': 'house_id',
		};
		Object.entries(staticFields).forEach(([formKey, apiKey]) => {
			const val = data[formKey];
			formattedData[apiKey] =
				val === undefined || Number(val) === 0 ? '-1' : String(Number(val) - 1);
		});

		if (data['clear_id']) {
			formattedData['erasebase'] = 'on';
		}

		console.log('formattedData', formattedData);
		mutate({ map, data: formattedData });
	};

	const onClosePopup = () => {
		router.push('/');
		setIsOpen(false);
	};

	const dataFields: Record<string, string> = {
		...text_field,
		...list_field,
	};

	const renderFields = () => {
		const options = ['Не загружать', ...(file_field || [])];
		const transformedOptions = options.map((opt, ind) => ({
			name: opt,
			value: ind,
		}));
		return Object.keys(dataFields).map((key, ind) => {
			const value = dataFields[key];

			return (
				<TitleItemForm key={ind} title={value} className='w-full sm:max-w-46'>
					<Controller
						name={key}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								position='absolute'
								classSelect='rounded-lg!'
								classText='h-5! flex items-center mr-1'
								options={transformedOptions}
								value={value as number | undefined}
								onChange={onChange}
							/>
						)}
					/>
				</TitleItemForm>
			);
		});
	};

	const renderDataId = () => {
		const options = [{ name: 'Нет', value: 0 }];
		const transformedOptions = [
			...options,
			...Object.entries(text_field).map(([key, val], ind) => ({
				name: String(val),
				value: ind + 1,
			})),
		];

		return (
			<div className='flex flex-col sm:flex-row justify-between w-full gap-6 sm:gap-2 sm:items-end'>
				<TitleItemForm title={'Идентификатор'} className='w-full sm:max-w-46'>
					<Controller
						name={'Идентификатор'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Select
								position='absolute'
								classSelect='rounded-lg! '
								classText='h-5! flex items-center mr-1'
								options={transformedOptions}
								value={value as number | undefined}
								onChange={onChange}
							/>
						)}
					/>
				</TitleItemForm>
				<Controller
					name='clear_id'
					control={control}
					render={({ field: { onChange, value, ref } }) => (
						<Checkbox
							label='Очистить список перед загрузкой.'
							classNameLabel='text-xs'
							checked={!!value}
							onChange={onChange}
							ref={ref}
						/>
					)}
				/>
			</div>
		);
	};

	const renderCoordinate = () => {
		const fields = ['Широта', 'Долгота', 'ID дома mosmap'];
		const options = ['Нет', ...(file_field || [])];
		const transformedOptions = options.map((opt, ind) => ({
			name: opt,
			value: ind,
		}));

		return fields.map((el, ind) => (
			<TitleItemForm key={ind} title={el} className='w-full sm:max-w-46'>
				<Controller
					name={el}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							position='absolute'
							classSelect='rounded-lg! '
							classText='h-5! flex items-center mr-1'
							options={transformedOptions}
							value={value as number | undefined}
							onChange={onChange}
						/>
					)}
				/>
			</TitleItemForm>
		));
	};

	return (
		<>
			<form
				className='bg-light-blue rounded-lg p-4 flex flex-col gap-6 sm:gap-4 max-h-full min-h-0 overflow-auto '
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex flex-wrap items-center justify-between gap-6 sm:gap-2 overflow-auto scrollbar-custom'>
					{renderFields()}
					<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />
					{renderDataId()}
					<div className='border-b border-b-dotted border-b-border-dotted w-full my-1' />
					{renderCoordinate()}
				</div>

				<div className='shrink-0 pt-2 flex justify-end'>
					<Button className='w-auto!'>Загрузить</Button>
				</div>

				{isError && <p className='text-text-red'>{error.message}</p>}
			</form>
			<Popup open={isOpen} onClose={onClosePopup}>
				<div className='flex flex-col items-center'>
					<div className='mb-4'>
						<p className='font-bold'>
							<span>Добавлено строк: </span>
							<span>{data?.add_rows}</span>
						</p>
						<p className='font-bold'>
							<span>Прочитано строк: </span>
							<span>{data?.read_rows}</span>
						</p>
						<p className='font-bold'>
							<span>Изменено строк: </span>
							<span>{data?.update_rows}</span>
						</p>
					</div>
					<Button onClick={onClosePopup} className='w-auto!'>
						Закрыть
					</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Отправка данных...' />
		</>
	);
};
