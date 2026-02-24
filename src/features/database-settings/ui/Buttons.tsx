import { FC } from 'react';
import { UseFieldArrayAppend } from 'react-hook-form';

import { ITableForm, ITableRow } from '../hooks/useFormTable';

import Button from '@/shared/ui/Button';

interface IProps {
	append: UseFieldArrayAppend<ITableForm, 'rows'>;
	rowsCount: number;
}

const createEmptyRow = (priority: number): ITableRow => ({
	id: Date.now(), // временный id (если нет backend id)
	name: '',
	priority,
	type: 0,

	namefield: false,
	nameonmap: false,
	address: false,
	mode: false,
	icon: false,
	color: false,
	visible: false,

	isNew: true,
});

const Buttons: FC<IProps> = ({ append, rowsCount }) => {
	const handleAdd = () => {
		append(createEmptyRow(rowsCount));
	};

	return (
		<div className='flex items-center justify-between'>
			<Button type='button' className='w-auto!'>
				Настройка карты
			</Button>
			<div className='flex items-center gap-2'>
				<Button type='button' className='whitespace-nowrap' onClick={handleAdd}>
					Добавить новое поле
				</Button>
				<Button type='submit'>Сохранить</Button>
			</div>
		</div>
	);
};

export default Buttons;
