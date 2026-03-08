import { FC } from 'react';
import { HexColorPicker } from 'react-colorful';

import Button from './Button';

interface IProps {
	isView: boolean;
	color: string;
	onClose: () => void;
	handleColorChange: (color: string) => void;
	className?: string;
}

const ColorPicker: FC<IProps> = ({
	color,
	onClose,
	handleColorChange,
	isView,
	className,
}) => {
	const styleView = isView ? 'opacity-100 block' : 'opacity-0 hidden';

	return (
		<div
			className={`${styleView} transition-opacity shadow-custom-black flex flex-col items-center gap-3 absolute -right-11 top-full z-10 p-2 bg-white ${className}`}
		>
			<HexColorPicker
				color={color}
				onChange={newColor => handleColorChange(newColor)}
			/>
			<Button
				onClick={e => {
					e.stopPropagation();
					onClose();
				}}
			>
				Закрыть
			</Button>
		</div>
	);
};

export default ColorPicker;
