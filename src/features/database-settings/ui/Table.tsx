'use client';

import { FC, useState } from 'react';
import { FieldArrayWithId, UseFieldArrayUpdate } from 'react-hook-form';

import { ITableForm, ITableRow } from '../hooks/useFormTable';

import ButtonSettings from './ButtonSettings';
import Row from './Row';
import AdditionalSettings from './additional-settings/AdditionalSettings';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import Popup from '@/shared/ui/Popup';

interface IProps {
	fields: FieldArrayWithId<ITableForm, 'rows', 'id'>[];
	moveRow: (from: number, to: number) => void;
	removeRow: (index: number) => void;
	update: UseFieldArrayUpdate<ITableForm, 'rows'>;
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

const Table: FC<IProps> = ({ fields, moveRow, removeRow, update }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [idAndCol, setIdAndCol] = useState<{
		id: number | null;
		col: string | null;
	}>({ id: null, col: null });
	const map = useGetMapForOtherPage();

	const handleClose = () => setIsOpen(false);
	const handleOpen = (col: string) => {
		let idElem;
		if (col === 'Иконка') {
			idElem = fields.find(el => el.icon)?.id_current;
		} else if (col === 'Цвет') {
			idElem = fields.find(el => el.color)?.id_current;
		}
		if (idElem) {
			setIdAndCol({ id: idElem, col });
		}
		setIsOpen(true);
	};
	const handleOpenAdditional = (data: ITableRow) => {
		const col =
			data.color && data.icon
				? 'all'
				: data.color
					? 'Цвет'
					: data.icon
						? 'Иконка'
						: null;
		setIdAndCol({ id: data.id_current, col });
		setIsOpen(true);
	};

	return (
		<>
			<div className='flex flex-col w-fit my-2 text-text-table min-h-0 flex-1 max-h-full'>
				<div
					className='grid gap-px items-center overflow-x-hidden overflow-y-auto scrollbar-custom'
					style={{
						gridTemplateColumns:
							'0.5fr 0.5fr 2.5fr 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
					}}
				>
					{columns.map((col, index) => {
						const isSettings = col === 'Иконка' || col === 'Цвет';
						return (
							<div
								key={`header-${index}`}
								className='min-h-9 p-0.5 sticky z-50 bg-light-blue top-0 font-bold text-xs flex items-center justify-center text-center '
								role='columnheader'
							>
								<span>{col}</span>
								{isSettings && (
									<ButtonSettings onOpen={() => handleOpen(col)} />
								)}
							</div>
						);
					})}

					{fields.map((row, rowIndex) =>
						columns.map((col, colIndex) => (
							<Row
								key={`cell-${row.id}-${colIndex}`}
								data={row}
								rowIndex={rowIndex}
								colIndex={colIndex}
								moveRow={moveRow}
								removeRow={removeRow}
								updateRow={update}
								allRows={fields}
								handleOpenAdditional={handleOpenAdditional}
							/>
						)),
					)}
				</div>
			</div>
			<Popup open={isOpen} onClose={handleClose}>
				{isOpen && map && (
					<AdditionalSettings
						handleBack={handleClose}
						map={map}
						idAndCol={idAndCol}
					/>
				)}
			</Popup>
		</>
	);
};

export default Table;
