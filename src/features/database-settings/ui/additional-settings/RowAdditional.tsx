import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { IRowAdditional } from '../../types';

import ChoiceIcon from './ChoiceIcon';
import Button from '@/shared/ui/Button';
import ColorPicker from '@/shared/ui/ColorPicker';
import { Input } from '@/shared/ui/fields';

interface IProps {
	data: IRowAdditional;
	col: string;
	rowIndex: number;
	handleChangeForm: (
		id: number,
		field: keyof IRowAdditional,
		value: string | number,
	) => void;
	map: string;
	removeRow: (id: number) => void;
}

const RowAdditional: FC<IProps> = ({
	data,
	col,
	rowIndex,
	handleChangeForm,
	map,
	removeRow,
}) => {
	const [icon, setIcon] = useState(data.icon_name);
	const [viewChoiceIcon, setViewChoiceIcon] = useState(false);
	const [isView, setIsView] = useState(false);

	useEffect(() => {
		if (data.icon_name) setIcon(data.icon_name);
	}, [data.icon_name]);

	const handleColorClose = () => setIsView(false);
	const handleView = () => setIsView(true);
	const handleViewIcons = () => setViewChoiceIcon(true);
	const handleCloseIcons = () => setViewChoiceIcon(false);
	const handleIcon = (name: string) => setIcon(name);

	switch (col) {
		case '#': {
			return (
				<div className='p-0.5 font-bold text-xs flex items-center justify-center'>
					{rowIndex + 1}
				</div>
			);
		}
		case 'Название':
			return (
				<div className='p-0.5 flex items-center justify-start' role='cell'>
					<div className='bg-white rounded-lg'>
						<Input
							className='h-8.5!'
							value={data.name}
							onChange={e => handleChangeForm(data.id, 'name', e.target.value)}
						/>
					</div>
				</div>
			);
		case 'Цвет':
			return (
				<div className='relative p-0.5 font-bold text-xs flex items-center justify-center'>
					<div
						className=' w-6 h-6 border border-gray-200 rounded-lg cursor-pointer'
						style={{ backgroundColor: data.color || 'transparent' }}
						onClick={handleView}
					/>
					{isView && (
						<ColorPicker
							color={data.color || ''}
							isView={isView}
							handleColorChange={(color: string) =>
								handleChangeForm(data.id, 'color', color)
							}
							onClose={handleColorClose}
						/>
					)}
				</div>
			);
		case 'Иконка':
			return (
				<div className='relative p-0.5 font-bold text-xs flex items-center justify-center'>
					<svg
						className=' text-gray-400 w-5 h-5 cursor-pointer'
						onClick={handleViewIcons}
					>
						<use xlinkHref={`/images/icons/sprite.svg#${icon}`}></use>
					</svg>
					{viewChoiceIcon && (
						<ChoiceIcon
							map={map}
							handleCloseIcons={handleCloseIcons}
							handleIcon={handleIcon}
						/>
					)}
				</div>
			);
		case 'Действие':
			return (
				<div className='p-0.5 flex items-center justify-center' role='cell'>
					<Button variant='icon' onClick={() => removeRow(data.id)}>
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

	return <div>RowAdditional</div>;
};

export default RowAdditional;
