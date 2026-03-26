import { FC, useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import type { IValueIntervalRange, TRangeFormValues } from '../types';

import { keepOnlyFirstHash } from '@/shared/lib/colors';
import ColorPicker from '@/shared/ui/ColorPicker';

interface IProps {
	r: IValueIntervalRange;
	index: number;
	setValue: UseFormSetValue<TRangeFormValues>;
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
			className={`w-15 h-7 sm:w-6 sm:h-6 rounded-md cursor-pointer relative`}
			style={{ backgroundColor: keepOnlyFirstHash(r.color) }}
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
