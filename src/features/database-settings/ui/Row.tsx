import Image from 'next/image';
import { FC, memo } from 'react';
import {
	Controller,
	FieldArrayWithId,
	UseFieldArrayUpdate,
	useFormContext,
	useWatch,
} from 'react-hook-form';

import { ITableForm, ITableRow } from '../hooks/useFormTable';

import ButtonSettings from './ButtonSettings';
import Button from '@/shared/ui/Button';
import Select from '@/shared/ui/Select';
import { CheckboxCircle } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';

interface IProps {
	data: ITableRow;
	label: string;
	colIndex: number;
	rowIndex: number;
	moveRow: (from: number, to: number) => void;
	removeRow: (index: number) => void;
	updateRow: UseFieldArrayUpdate<ITableForm, 'rows'>;
	allRows: FieldArrayWithId<ITableForm, 'rows', 'id'>[];
	handleOpenAdditional: (data: ITableRow) => void;
}

const Row: FC<IProps> = ({
	data,
	colIndex,
	rowIndex,
	moveRow,
	removeRow,
	updateRow,
	allRows,
	handleOpenAdditional,
	label,
}) => {
	const { control, register, getValues } = useFormContext<ITableForm>();

	//HELP: Следим за актуальным типом — нужно для новых строк, где тип меняется через Select
	const currentType = useWatch({
		control,
		name: `rows.${rowIndex}.type`,
	});

	//HELP: Используем currentType вместо data.type везде где нужна реактивность
	const type = currentType ?? data.type;

	const renderCheckbox = (
		fieldName: keyof ITableForm['rows'][number],
		disabled: boolean,
	) => (
		<div className='p-0.5 text-xs xl:text-sm flex items-center justify-center'>
			<Controller
				name={`rows.${rowIndex}.${fieldName}`}
				control={control}
				render={({ field }) => (
					<CheckboxCircle
						disabled={disabled}
						checked={!!field.value}
						onChange={field.onChange}
					/>
				)}
			/>
		</div>
	);

	const renderExclusiveCheckbox = (
		fieldName: keyof ITableRow,
		disabled: boolean,
		rowIndex: number,
	) => (
		<div className='p-0.5 text-xs xl:text-sm flex items-center justify-center'>
			<Controller
				name={`rows.${rowIndex}.${fieldName}`}
				control={control}
				render={({ field }) => (
					<CheckboxCircle
						disabled={disabled}
						checked={!!field.value}
						onChange={(val: boolean) => {
							if (!val) {
								updateRow(rowIndex, {
									...getValues(`rows.${rowIndex}`), // вместо ...data
									[fieldName]: false,
								});
								return;
							}

							allRows.forEach((row, index) => {
								if (index !== rowIndex && row[fieldName]) {
									updateRow(index, {
										...getValues(`rows.${index}`), // вместо ...row
										[fieldName]: false,
									});
								}
							});

							updateRow(rowIndex, {
								...getValues(`rows.${rowIndex}`), // вместо ...data
								[fieldName]: true,
							});
						}}
					/>
				)}
			/>
		</div>
	);

	const CellWrapper = ({
		children,
		className = '',
	}: {
		children: React.ReactNode;
		className?: string;
	}) => (
		<div className='flex flex-col w-full bg-light-blue sm:bg-transparent'>
			{/* Этот блок виден только на мобилках. 
          Он занимает первую колонку (Label), а children вторую (Value) */}
			{label && (
				<div className='sm:hidden bg-gray-50 p-2 text-xs font-semibold flex items-center'>
					{label}
				</div>
			)}
			<div
				className={`p-0.5 flex items-center justify-center sm:justify-center sm:border-none ${className}`}
			>
				{children}
			</div>
		</div>
	);

	switch (colIndex) {
		case 0:
			return (
				// <div className='p-0.5 font-bold text-xs flex items-center justify-center'>
				// 	{rowIndex + 1}
				// </div>
				<>
					<div className='sm:hidden my-5 col-span-2 bg-primary/10 p-2 font-bold text-center rounded-lg'>
						{rowIndex + 1}
					</div>
					<div className='hidden sm:flex p-0.5 font-bold text-xs items-center justify-center'>
						{rowIndex + 1}
					</div>
				</>
			);
		case 1:
			return (
				<CellWrapper className='rounded-t-xl'>
					<div className='p-0.5 flex items-center justify-center'>
						<Button
							variant='icon'
							className='text-primary text-5xl! sm:text-xs! mr-6! sm:mr-0! min-h-14! sm:min-h-auto!'
							onClick={() => moveRow(rowIndex, rowIndex + 1)}
						>
							&dArr;
						</Button>
						<Button
							variant='icon'
							className='text-primary text-5xl! sm:text-xs! mr-6! sm:mr-0! min-h-14! sm:min-h-auto!'
							onClick={() => moveRow(rowIndex, rowIndex - 1)}
						>
							&uArr;
						</Button>
					</div>
				</CellWrapper>
			);
		case 2: {
			const isSettings = type === 6;
			return (
				// <div className='p-0.5 flex items-center justify-start' role='cell'>
				// 	<div className='bg-white rounded-lg'>
				// 		<Input className='h-8.5!' {...register(`rows.${rowIndex}.name`)} />
				// 	</div>
				// 	{isSettings && (
				// 		<ButtonSettings onOpen={() => handleOpenAdditional(data)} />
				// 	)}
				// </div>
				<CellWrapper className='justify-start!'>
					<div className='bg-white rounded-lg w-full'>
						<Input
							className='h-12! sm:h-8.5!'
							fullWidth
							{...register(`rows.${rowIndex}.name`)}
						/>
					</div>
					{isSettings && (
						<ButtonSettings onOpen={() => handleOpenAdditional(data)} />
					)}
				</CellWrapper>
			);
		}
		case 3: {
			const typeLabels: Record<number, string> = {
				0: 'Строка',
				// 6: 'Строка',
				1: 'Число',
				5: 'Текст',
				6: 'Список',
			};
			// Если новый объект — рендерим Input
			if (data.isNew) {
				const options = [
					{ value: 0, name: 'Строка' },
					{ value: 1, name: 'Число' },
					{ value: 5, name: 'Текст' },
					// { value: 7, name: 'Список' },
					{ value: 6, name: 'Список' },
				];
				return (
					<CellWrapper>
						<div className='h-8.5 p-0.5 flex items-center justify-center'>
							<div className='bg-white rounded-lg w-full'>
								<Controller
									name={`rows.${rowIndex}.type`}
									render={({ field: { onChange, value } }) => {
										const isSaveValue = localStorage.getItem(
											`rows.${rowIndex}.type`,
										);
										let saveValue;
										if (isSaveValue) {
											saveValue = Number(isSaveValue);
										} else {
											saveValue = value;
										}
										// const saveValue = localStorage.getItem(`rows.${rowIndex}.type`) ?? value
										const saveOnChange = (val: number) => {
											localStorage.setItem(
												`rows.${rowIndex}.type`,
												String(val),
											);
											onChange(val);
										};

										return (
											<Select
												options={options}
												value={saveValue}
												onChange={saveOnChange}
												position='absolute'
											/>
										);
									}}
								/>
							</div>
						</div>
					</CellWrapper>
				);
			}
			// Старая логика для обычных объектов
			return (
				<CellWrapper>
					<div className='h-12 sm:h-8.5 p-0.5 w-full text-xs border border-border-input-gray px-4 py-2 rounded-lg bg-white flex items-center justify-center'>
						{/* {typeLabels[data.type] || ''} */}
						{typeLabels[type] || ''}
					</div>
				</CellWrapper>
			);
		}
		// Группируем логику чекбоксов
		case 4:
			return (
				// <CellWrapper>
				// 	{renderCheckbox('namefield', type === 6 || type === 7)}
				// </CellWrapper>
				<CellWrapper>
					{renderExclusiveCheckbox(
						'namefield',
						// [0, 5, 1, 7].includes(type),
						type === 6 || type === 7,
						rowIndex,
					)}
				</CellWrapper>
			);

		case 5:
			return (
				// <CellWrapper>
				// 	{renderCheckbox('nameonmap', type === 6 || type === 7)}
				// </CellWrapper>
				<CellWrapper>
					{renderExclusiveCheckbox(
						'nameonmap',
						// [0, 5, 1, 7].includes(type),
						type === 6 || type === 7,
						rowIndex,
					)}
				</CellWrapper>
			);

		case 6:
			return (
				<CellWrapper>
					{renderCheckbox('address', type === 6 || type === 7)}
				</CellWrapper>
			);

		case 7:
			return (
				<CellWrapper>
					{renderCheckbox('mode', [0, 5, 1].includes(type))}
				</CellWrapper>
			);

		case 8:
			return (
				<CellWrapper>
					{renderExclusiveCheckbox(
						'icon',
						[0, 5, 1, 7].includes(type),
						rowIndex,
					)}
				</CellWrapper>
			);

		case 9:
			return (
				<CellWrapper>
					{renderExclusiveCheckbox(
						'color',
						[0, 5, 1, 7].includes(type),
						rowIndex,
					)}
				</CellWrapper>
			);

		case 10:
			return (
				<CellWrapper>
					{renderCheckbox('visible', [0, 5, 1, 6].includes(type))}
				</CellWrapper>
			);

		case 11: {
			const forbiddenNames = ['Районы Москвы', 'Округа', 'Районы области'];
			// const isDisabled = data.type === 7;
			return (
				<CellWrapper className='min-h-10 sm:min-h-auto'>
					<div className='p-2 sm:p-0.5 flex items-center justify-center min-h-10 sm:min-h-auto'>
						<Button
							className='min-h-10! sm:min-h-auto!'
							variant='icon'
							disabled={forbiddenNames.includes(data.name)}
							onClick={() => removeRow(rowIndex)}
						>
							{/* <Button variant='icon' disabled={isDisabled}> */}
							<Image
								src='/images/icons/exit.svg'
								alt='exit'
								width={20}
								height={20}
								className='w-10 h-10 sm:w-3 sm:h-3'
							/>
						</Button>
					</div>
				</CellWrapper>
			);
		}
		default:
			return (
				<CellWrapper>
					<div
						className='p-3 text-xs xl:text-sm flex items-center justify-center '
						role='cell'
					>
						{data.name}
					</div>
				</CellWrapper>
			);
	}
};

export default memo(Row);
