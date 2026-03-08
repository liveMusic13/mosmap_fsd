import { useEffect, useState } from 'react';

import { IRowAdditional } from '../types';

export const useFormAdditionalTable = (initialData: IRowAdditional[]) => {
	const [formRows, setFormRows] = useState(() => initialData);
	useEffect(() => {
		if (initialData.length > 0) {
			setFormRows(initialData);
		}
	}, [initialData.length]);

	const handleChangeForm = (
		id: number,
		field: keyof IRowAdditional,
		value: string | number,
	) => {
		setFormRows(prev => {
			const findRowIndex = prev.findIndex(row => row.id === id);

			if (findRowIndex === -1) return prev;

			const updatedRows = [...prev];

			updatedRows[findRowIndex] = {
				...updatedRows[findRowIndex],
				[field]: value,
			};

			return updatedRows;
		});
	};

	const addRow = (idAndCol: { id: number | null; col: string | null }) => {
		const defaultRow: IRowAdditional = {
			id: Math.random(),
			name: '',
		};

		if (idAndCol.col === 'all') {
			defaultRow.icon_name = formRows[0].icon_name ?? '';
			defaultRow.color = formRows[0].color ?? '#000';
		}
		if (idAndCol.col === 'Цвет') {
			defaultRow.color = formRows[0].color ?? '#000';
		}
		if (idAndCol.col === 'Иконка') {
			defaultRow.icon_name = formRows[0].icon_name ?? '';
		}

		setFormRows(p => [...p, defaultRow]);
	};

	const removeRow = (id: number) => {
		setFormRows(prev => prev.filter(row => row.id !== id));
	};

	return {
		formRows,
		handleChangeForm,
		addRow,
		removeRow,
	};
};
