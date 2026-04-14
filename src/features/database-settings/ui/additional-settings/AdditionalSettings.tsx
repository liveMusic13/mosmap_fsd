import { FC, useLayoutEffect } from 'react';

import {
	IRowWithNewFlag,
	useFormAdditionalTable,
} from '../../hooks/useFormAdditionalTable';
import { useGetListItems } from '../../hooks/useGetListItems';
import { IRowAdditional } from '../../types';

import TableAdditional from './TableAdditional';
import Button from '@/shared/ui/Button';
import { Loader, LoaderPortal } from '@/shared/ui/loader';

interface IProps {
	handleBack: () => void;
	map: string;
	idAndCol: {
		id: number | null;
		col: string | null;
	};
}

const AdditionalSettings: FC<IProps> = ({ handleBack, map, idAndCol }) => {
	const {
		mutate,
		mutateAsync,
		data: data_listItems,
		isPending,
	} = useGetListItems();

	useLayoutEffect(() => {
		if (idAndCol.id) mutate({ map, idObject: idAndCol.id });
	}, []);

	const { formRows, handleChangeForm, addRow, removeRow } =
		useFormAdditionalTable(data_listItems ?? []);

	const onSubmit = async () => {
		if (idAndCol.id) {
			const clearRows = (formRows as IRowWithNewFlag[]).map(row => {
				let resultRow: IRowAdditional = {
					id: row?.isNew ? 0 : row.id,
					name: row.name,
				};

				if (row.color) resultRow.color = row.color;
				if (row.icon_name) resultRow.icon_name = row.icon_name;

				return resultRow;
			});

			await mutateAsync({
				map,
				idObject: idAndCol.id,
				items: clearRows,
			});
			handleBack();
		}
	};

	return (
		<>
			<div className='flex flex-col shadow-custom-green border border-border-gray rounded-xl max-h-3/4 min-h-0 p-4 min-w-sm max-w-3xl '>
				<div className='border-b border-b-dotted border-b-border-dotted pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 mb-2 shrink-0'>
					<h1 className='font-bold text-lg whitespace-nowrap'>
						Настроить группу
					</h1>
					<Button type='button' onClick={handleBack} className='w-auto!'>
						Назад
					</Button>
				</div>
				<form className='flex flex-col gap-1 rounded-lg bg-light-blue min-h-0 max-h-[75vh]'>
					<TableAdditional
						isColor={idAndCol.col === 'Цвет' || idAndCol.col === 'all'}
						isIcon={idAndCol.col === 'Иконка' || idAndCol.col === 'all'}
						formRows={formRows}
						handleChangeForm={handleChangeForm}
						map={map}
						removeRow={removeRow}
					/>
					<div className='flex flex-col gap-2 items-end'>
						<Button
							type='button'
							className='w-auto!'
							onClick={() => addRow(idAndCol)}
						>
							Добавить
						</Button>
						{isPending && <Loader />}
						<Button type='button' className='min-h-8' onClick={onSubmit}>
							Сохранить
						</Button>
					</div>
				</form>
			</div>
			<LoaderPortal isLoading={isPending} message='Сохраняем..' />
		</>
	);
};

export default AdditionalSettings;
