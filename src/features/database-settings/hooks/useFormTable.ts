import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { IObjectOne, IObjectThree, IObjectTwo } from '../types';

export interface ITableRow {
	id: number;
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

	console.log('zdes', useWatch({ control: methods.control }));

	useEffect(() => {
		if (initialData.length) {
			methods.reset({
				rows: initialData.map(normalizeRow),
			});
		}
	}, [initialData, methods.reset]);

	console.log('fieldArray', fieldArray);

	const onSubmit = (data: ITableForm) => {
		console.log('SUBMIT:', data);
	};

	return {
		methods,
		...fieldArray,
		onSubmit,
	};
};
