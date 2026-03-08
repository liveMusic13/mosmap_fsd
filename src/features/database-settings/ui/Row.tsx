import Image from 'next/image';
import { FC, memo } from 'react';
import {
	Controller,
	FieldArrayWithId,
	UseFieldArrayUpdate,
	useFormContext,
} from 'react-hook-form';

import { ITableForm, ITableRow } from '../hooks/useFormTable';

import ButtonSettings from './ButtonSettings';
import Button from '@/shared/ui/Button';
import Select from '@/shared/ui/Select';
import { CheckboxCircle } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';

interface IProps {
	data: ITableRow;
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
}) => {
	const { control, register } = useFormContext<ITableForm>();

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
								// просто выключаем текущий
								updateRow(rowIndex, {
									...data,
									[fieldName]: false,
								});
								return;
							}

							// выключаем у всех остальных
							allRows.forEach((row, index) => {
								if (index !== rowIndex && row[fieldName]) {
									updateRow(index, {
										...row,
										[fieldName]: false,
									});
								}
							});

							// включаем текущий
							updateRow(rowIndex, {
								...data,
								[fieldName]: true,
							});
						}}
					/>
				)}
			/>
		</div>
	);

	switch (colIndex) {
		case 0:
			return (
				<div className='p-0.5 font-bold text-xs flex items-center justify-center'>
					{rowIndex + 1}
				</div>
			);
		case 1:
			return (
				<div className='p-0.5 flex items-center justify-center'>
					<Button
						variant='icon'
						className='text-primary'
						onClick={() => moveRow(rowIndex, rowIndex + 1)}
					>
						&dArr;
					</Button>
					<Button
						variant='icon'
						className='text-primary'
						onClick={() => moveRow(rowIndex, rowIndex - 1)}
					>
						&uArr;
					</Button>
				</div>
			);
		case 2: {
			const isSettings = data.type === 6;
			return (
				<div className='p-0.5 flex items-center justify-start' role='cell'>
					<div className='bg-white rounded-lg'>
						<Input className='h-8.5!' {...register(`rows.${rowIndex}.name`)} />
					</div>
					{isSettings && (
						<ButtonSettings onOpen={() => handleOpenAdditional(data)} />
					)}
				</div>
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
					{ value: 7, name: 'Список' },
				];
				return (
					<div className='h-8.5 p-0.5 flex items-center justify-center'>
						<div className='bg-white rounded-lg w-full'>
							<Controller
								name={`rows.${rowIndex}.type`}
								render={({ field: { onChange, value } }) => (
									<Select
										options={options}
										value={value}
										onChange={onChange}
										position='absolute'
									/>
								)}
							/>
						</div>
					</div>
				);
			}
			// Старая логика для обычных объектов
			return (
				<div className='h-8.5 p-0.5 text-xs border border-border-input-gray px-4 py-2 rounded-lg bg-white flex items-center justify-center'>
					{typeLabels[data.type] || ''}
				</div>
			);
		}
		// Группируем логику чекбоксов
		case 4:
			return renderCheckbox('namefield', data.type === 6 || data.type === 7);

		case 5:
			return renderCheckbox('nameonmap', data.type === 6 || data.type === 7);

		case 6:
			return renderCheckbox('address', data.type === 6 || data.type === 7);

		case 7:
			return renderCheckbox('mode', [0, 5, 1].includes(data.type));

		case 8:
			return renderExclusiveCheckbox(
				'icon',
				[0, 5, 1, 7].includes(data.type),
				rowIndex,
			);

		case 9:
			return renderExclusiveCheckbox(
				'color',
				[0, 5, 1, 7].includes(data.type),
				rowIndex,
			);

		// case 8:
		// 	return renderCheckbox('icon', [0, 5, 1, 7].includes(data.type));

		// case 9:
		// 	return renderCheckbox('color', [0, 5, 1, 7].includes(data.type));

		case 10:
			return renderCheckbox('visible', [0, 5, 1, 6].includes(data.type));

		case 11: {
			const forbiddenNames = ['Районы Москвы', 'Округа', 'Районы области'];
			// const isDisabled = data.type === 7;
			return (
				<div className='p-0.5 flex items-center justify-center'>
					<Button
						variant='icon'
						disabled={forbiddenNames.includes(data.name)}
						onClick={() => removeRow(rowIndex)}
					>
						{/* <Button variant='icon' disabled={isDisabled}> */}
						<Image
							src='/images/icons/exit.svg'
							alt='exit'
							width={12}
							height={12}
						/>
					</Button>
				</div>
			);
		}
		default:
			return (
				<div
					className='p-3 text-xs xl:text-sm flex items-center justify-center '
					role='cell'
				>
					{data.name}
				</div>
			);
	}
};

export default memo(Row);
