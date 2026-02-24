import Image from 'next/image';
import { FC, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ITableForm, ITableRow } from '../hooks/useFormTable';

import Button from '@/shared/ui/Button';
import Select from '@/shared/ui/Select';
import { CheckboxCircle } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';

interface IProps {
	// data: IObjectOne | IObjectTwo | IObjectThree;
	data: ITableRow;
	colIndex: number;
	rowIndex: number;
}

const Row: FC<IProps> = ({ data, colIndex, rowIndex }) => {
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

	switch (colIndex) {
		case 0:
			return (
				<div className='p-0.5 font-bold text-xs flex items-center justify-center'>
					{/* {data.priority + 1} */}
					{rowIndex + 1}
				</div>
			);
		case 1:
			return (
				<div className='p-0.5 flex items-center justify-center'>
					<Button variant='icon' className='text-primary'>
						&dArr;
					</Button>
					<Button variant='icon' className='text-primary'>
						&uArr;
					</Button>
				</div>
			);
		case 2:
			return (
				<div className='p-0.5 flex items-center justify-center' role='cell'>
					<div className='bg-white rounded-lg'>
						{/* <Input
							variant='default'
							defaultValue={data.name}
							{...register(`row_${data.id}_active_${colIndex}`)}
						/> */}
						<Input className='h-8.5!' {...register(`rows.${rowIndex}.name`)} />
					</div>
				</div>
			);
		case 3: {
			const typeLabels: Record<number, string> = {
				0: 'Строка',
				6: 'Строка',
				1: 'Число',
				5: 'Текст',
				7: 'Список',
			};
			// return (
			// 	<div className='h-8.5 p-0.5 text-xs border border-border-input-gray px-4 py-2 rounded-lg bg-white flex items-center justify-center'>
			// 		{typeLabels[data.type] || ''}
			// 	</div>
			// );
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
							{/* <Input
								variant='default'
								defaultValue={''} // можно пусто или '0'
								// если нужен RHF контролируемый input:
								{...register(`rows.${rowIndex}.type`)}
							/> */}
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
			return renderCheckbox('icon', [0, 5, 1, 7].includes(data.type));

		case 9:
			return renderCheckbox('color', [0, 5, 1, 7].includes(data.type));

		case 10:
			return renderCheckbox('visible', [0, 5, 1, 6].includes(data.type));

		case 11: {
			const forbiddenNames = ['Районы Москвы', 'Округа', 'Районы области'];
			return (
				<div className='p-0.5 flex items-center justify-center'>
					<Button variant='icon' disabled={forbiddenNames.includes(data.name)}>
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

// const renderCheckbox = (
// 		disabledLogic: boolean,
// 		defaultVal: boolean = false,
// 	) => (
// 		<div className='p-0.5 text-xs xl:text-sm flex items-center justify-center'>
// 			<Controller
// 				// name={`row_${data.id}_active_${colIndex}`}
// 				name={`rows.${rowIndex}.visible`}
// 				defaultValue={defaultVal}
// 				control={control}
// 				render={({ field: { value, onChange } }) => (
// 					<CheckboxCircle
// 						disabled={disabledLogic}
// 						checked={!!value}
// 						onChange={onChange}
// 					/>
// 				)}
// 			/>
// 		</div>
// 	);

// case 4:
// 			return renderCheckbox(
// 				data.type === 6 || data.type === 7,
// 				getInitialTextForFieldValue(),
// 			);
// 		case 5:
// 			return renderCheckbox(
// 				data.type === 6 || data.type === 7,
// 				getInitialTextForMapValue(),
// 			);
// 		case 6:
// 			return renderCheckbox(
// 				data.type === 6 || data.type === 7,
// 				getInitialAddressValue(),
// 			);
// 		case 7:
// 			return renderCheckbox(
// 				[0, 5, 1].includes(data.type),
// 				getInitialMultiChoiceValue(),
// 			);
// 		case 8:
// 			return renderCheckbox(
// 				[0, 5, 1, 7].includes(data.type),
// 				getInitialIconValue(),
// 			);
// 		case 9:
// 			return renderCheckbox(
// 				[0, 5, 1, 7].includes(data.type),
// 				getInitialColorValue(),
// 			);
// 		case 10:
// 			return renderCheckbox(
// 				[0, 5, 1, 6].includes(data.type),
// 				getInitialVisibleValue(),
// 			);

// const getInitialAddressValue = () => {
// 		if ('address' in data) {
// 			return data.address === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialTextForMapValue = () => {
// 		if ('nameonmap' in data) {
// 			return data.nameonmap === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialTextForFieldValue = () => {
// 		if ('namefield' in data) {
// 			return data.namefield === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialVisibleValue = () => {
// 		if ('visible' in data) {
// 			return data.visible === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialMultiChoiceValue = () => {
// 		if ('mode' in data) {
// 			return data.mode === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialIconValue = () => {
// 		if ('icon' in data) {
// 			return data.icon === 1;
// 		}
// 		return false;
// 	};
// 	const getInitialColorValue = () => {
// 		if ('color' in data) {
// 			return data.color === 1;
// 		}
// 		return false;
// 	};
