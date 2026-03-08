import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { IObjectOne, IObjectThree, IObjectTwo, TTypeObject } from '../types';

import { useSaveAllFields } from './useSaveAllFields';

export interface ITableRow {
	id: number;
	id_current: number;
	name: string;
	priority: number;
	type: number;

	namefield: boolean;
	nameonmap: boolean;
	address: boolean;
	mode: boolean;
	icon: boolean;
	color: boolean;
	visible: boolean;

	isNew?: boolean;
}

export interface ITableForm {
	rows: ITableRow[];
}

export const useFormTable = (
	initialData: (IObjectOne | IObjectTwo | IObjectThree)[],
) => {
	const normalizeRow = (
		row: IObjectOne | IObjectTwo | IObjectThree,
	): ITableRow => ({
		id_current: row.id,
		id: row.id,
		name: row.name,
		priority: row.priority,
		type: row.type,

		namefield: 'namefield' in row ? row.namefield === 1 : false,
		nameonmap: 'nameonmap' in row ? row.nameonmap === 1 : false,
		address: 'address' in row ? row.address === 1 : false,
		mode: 'mode' in row ? row.mode === 1 : false,
		icon: 'icon' in row ? row.icon === 1 : false,
		color: 'color' in row ? row.color === 1 : false,
		visible: 'visible' in row ? row.visible === 1 : false,
	});

	const methods = useForm<ITableForm>({
		defaultValues: {
			rows: [],
		},
		mode: 'onChange',
	});

	const fieldArray = useFieldArray({
		control: methods.control,
		name: 'rows',
	});

	const { mutate } = useSaveAllFields();

	useEffect(() => {
		if (initialData.length) {
			methods.reset({
				rows: initialData.map(normalizeRow),
			});
		}
	}, [initialData, methods.reset]);

	const moveRow = (from: number, to: number) => {
		if (to < 0 || to >= fieldArray.fields.length) return; // защита от выхода за границы
		fieldArray.move(from, to);

		// синхронизация priority
		const updatedRows = methods.getValues('rows');
		updatedRows.forEach((row, idx) => (row.priority = idx));
		methods.setValue('rows', updatedRows);
	};

	const removeRow = (index: number) => {
		fieldArray.remove(index);

		// синхронизация priority
		const updatedRows = methods.getValues('rows');
		updatedRows.forEach((row, idx) => (row.priority = idx));
		methods.setValue('rows', updatedRows);
	};

	console.log(useWatch({ control: methods.control }));
	const onSubmit = (data: ITableForm) => {
		console.log('SUBMIT:', data);
		const editData: (IObjectOne | IObjectTwo | IObjectThree)[] = data.rows.map(
			row => {
				const typeRow: Record<number, string> = {
					0: 'Строка',
					1: 'Число',
					5: 'Текст',
					6: 'Список',
				};
				const type_name: string = typeRow[row.type];

				switch (type_name) {
					case 'Строка': {
						return {
							id: row.id_current,
							name: row.name,
							priority: row.priority,
							namefield: row.namefield ? 1 : 0,
							nameonmap: row.nameonmap ? 1 : 0,
							address: row.address ? 1 : 0,
							type_name,
							type: row.type as TTypeObject,
						};
					}
					case 'Число': {
						return {
							id: row.id_current,
							name: row.name,
							priority: row.priority,
							namefield: row.namefield ? 1 : 0,
							nameonmap: row.nameonmap ? 1 : 0,
							address: row.address ? 1 : 0,
							type_name,
							type: row.type as TTypeObject,
						};
					}
					case 'Текст': {
						return {
							id: row.id_current,
							name: row.name,
							priority: row.priority,
							namefield: row.namefield ? 1 : 0,
							nameonmap: row.nameonmap ? 1 : 0,
							address: row.address ? 1 : 0,
							type_name,
							type: row.type as TTypeObject,
						};
					}
					case 'Список': {
						return {
							id: row.id_current,
							name: row.name,
							priority: row.priority,
							color: row.color ? 1 : 0,
							icon: row.icon ? 1 : 0,
							mode: row.mode ? 1 : 0,
							type: row.type as TTypeObject,
						};
					}
					default: {
						return {
							id: row.id_current,
							name: row.name,
							mode: row.mode ? 1 : 0,
							priority: row.priority,
							type: row.type as TTypeObject,
							visible: row.visible ? 1 : 0,
						};
					}
				}
			},
		);
		mutate(editData);
	};

	return {
		methods,
		...fieldArray,
		onSubmit,
		moveRow,
		removeRow,
	};
};
