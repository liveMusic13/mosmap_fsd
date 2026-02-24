import { FC } from 'react';
import { FieldArrayWithId } from 'react-hook-form';

import { ITableForm } from '../hooks/useFormTable';

import Row from './Row';

interface IProps {
	fields: FieldArrayWithId<ITableForm, 'rows', 'id'>[];
}

const columns = [
	'#',
	'',
	'Наименование столбца',
	'Тип',
	'Текст для списка',
	'Текст для карты',
	'Адрес',
	'Множ. выбор',
	'Иконка',
	'Цвет',
	'Вкл/Выкл',
	'',
];

const Table: FC<IProps> = ({ fields }) => {
	console.log('fields', fields);

	return (
		<div className='flex flex-col w-fit my-2 text-text-table min-h-0 flex-1 max-h-full'>
			<div
				className='grid gap-px items-center overflow-x-hidden overflow-y-auto scrollbar-custom'
				style={{
					gridTemplateColumns:
						'0.5fr 0.5fr 3fr 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
				}}
			>
				{columns.map((col, index) => (
					<div
						key={`header-${index}`}
						className='min-h-9 p-0.5 sticky z-9999 bg-light-blue top-0 font-bold text-xs flex items-center justify-center text-center '
						role='columnheader'
					>
						{col}
					</div>
				))}

				{fields.map((row, rowIndex) =>
					columns.map((col, colIndex) => (
						<Row
							key={`cell-${row.id}-${colIndex}`}
							data={row}
							rowIndex={rowIndex}
							colIndex={colIndex}
						/>
					)),
				)}
			</div>
		</div>
	);
};

export default Table;

{
	/* {localData
					.sort((a, b) => a.priority - b.priority)
					.map(row =>
						columns.map((col, colIndex) => (
							<Row
								key={`cell-${row.id}-${colIndex}-1`}
								data={row}
								colIndex={colIndex}
							/>
						)),
					)} */
}
