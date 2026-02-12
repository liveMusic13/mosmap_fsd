import { FC } from 'react';

import { Range } from './Range';
import { useRange } from '@/shared/hooks/useRange';

export const ControlledRange: FC<{
	onChange: (value: { min: number; max: number }) => void;
	value?: { min: number; max: number };
	rangeBoundaries: { min: number; max: number };
}> = ({ onChange, value, rangeBoundaries }) => {
	const {
		containerRef,
		localValues,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTouchMove,
		handleTouchStart,
	} = useRange({ rangeBoundaries, onChange, initialValues: value });

	return (
		<Range
			min={rangeBoundaries.min}
			max={rangeBoundaries.max}
			localValues={localValues}
			containerRef={containerRef}
			handleMouseDown={handleMouseDown}
			handleMouseMove={handleMouseMove}
			handleMouseUp={handleMouseUp}
			handleTouchMove={handleTouchMove}
			handleTouchStart={handleTouchStart}
		/>
	);
};
