import { FC, useLayoutEffect, useState } from 'react';

import { IRowAdditional } from '../../types';

import RowAdditional from './RowAdditional';

interface IProps {
	isColor?: boolean;
	isIcon?: boolean;
	formRows: IRowAdditional[];
	handleChangeForm: (
		id: number,
		field: keyof IRowAdditional,
		value: string | number,
	) => void;
	map: string;
	removeRow: (id: number) => void;
}

const TableAdditional: FC<IProps> = ({
	isColor,
	isIcon,
	formRows,
	handleChangeForm,
	map,
	removeRow,
}) => {
	const [columns, setColumns] = useState(['#', 'Название']);

	useLayoutEffect(() => {
		const newColumns = ['#', 'Название'];
		if (isColor) newColumns.push('Цвет');
		if (isIcon) newColumns.push('Иконка');
		newColumns.push('Действие');

		setColumns(newColumns);
	}, []);

	const gridColumnsCount = columns.length;
	const gridTemplateColumns =
		gridColumnsCount === 3
			? '0.5fr 2.5fr 1fr'
			: gridColumnsCount === 4
				? '0.5fr 2.5fr 1fr 1fr'
				: '0.5fr 2.5fr 1fr 1fr 1fr';

	return (
		<div className='flex flex-col w-fit my-2 text-text-table min-h-0 flex-1 max-h-full'>
			<div
				className='grid gap-px items-center overflow-x-hidden overflow-y-auto scrollbar-custom'
				style={{
					gridTemplateColumns,
				}}
			>
				{columns.map((col, index) => {
					return (
						<div
							key={`header-${index}`}
							className='min-h-9 p-0.5 sticky z-50 bg-light-blue top-0 font-bold text-xs flex items-center justify-center text-center '
							role='columnheader'
						>
							{col}
						</div>
					);
				})}
				{formRows.map((row, rowIndex) =>
					columns.map((col, colIndex) => (
						<RowAdditional
							key={`cell-${row.id}-${colIndex}`}
							data={row}
							col={col}
							rowIndex={rowIndex}
							handleChangeForm={handleChangeForm}
							map={map}
							removeRow={removeRow}
						/>
					)),
				)}
			</div>
		</div>
	);
};

export default TableAdditional;
