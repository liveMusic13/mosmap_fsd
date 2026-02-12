import { FC, useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import type { RangeFormValues, RangeItem } from '../types';

import ColorPicker from '@/shared/ui/ColorPicker';

interface IProps {
	r: RangeItem;
	index: number;
	setValue: UseFormSetValue<RangeFormValues>;
}

export const WrapperColorPicker: FC<IProps> = ({ r, index, setValue }) => {
	const [isView, setIsView] = useState(false);

	const toggleView = () => setIsView(v => !v);
	const onClose = () => setIsView(false);

	const addColor = (color: string) => {
		setValue(`ranges.${index}.color`, color, {
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	return (
		<div
			className={`w-6 h-6 rounded-md cursor-pointer relative`}
			style={{ backgroundColor: r.color }}
			onClick={toggleView}
		>
			<ColorPicker
				color={r.color}
				isView={isView}
				onClose={onClose}
				handleColorChange={addColor}
			/>
		</div>
	);
};
