import { useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
	rangeBoundaries?: { min: number; max: number };
	step?: number;
	onChange?: (values: { min: number; max: number }) => void;
	initialValues?: { min: number; max: number };
}

export const useRange = ({
	rangeBoundaries = { min: 0, max: 100 },
	step = 1, //HELP: на сколько изменяется значение
	onChange,
	initialValues,
}: IProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
	const [localValues, setLocalValues] = useState({
		min: initialValues?.min ?? rangeBoundaries.min,
		max: initialValues?.max ?? rangeBoundaries.max,
	});

	useEffect(() => {
		if (initialValues && !dragging) {
			setLocalValues({
				min: initialValues.min ?? rangeBoundaries.min,
				max: initialValues.max ?? rangeBoundaries.max,
			});
		}
	}, [initialValues?.min, initialValues?.max, dragging, rangeBoundaries]);

	const calculateValue = useCallback(
		(clientX: number) => {
			if (!containerRef.current) return 0;
			const rect = containerRef.current.getBoundingClientRect();
			const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
			const percentage = x / rect.width;
			const value =
				rangeBoundaries.min +
				percentage * (rangeBoundaries.max - rangeBoundaries.min);
			return Math.round(value / step) * step;
		},
		[rangeBoundaries, step],
	);

	const updateValue = useCallback(
		(type: 'min' | 'max', value: number) => {
			setLocalValues(prev => {
				const newValues = { ...prev };
				if (type === 'min') {
					newValues.min = Math.min(value, prev.max - step);
				} else {
					newValues.max = Math.max(value, prev.min + step);
				}

				return newValues;
			});
		},
		[setLocalValues, step],
	);

	const handleMouseDown = useCallback(
		(type: 'min' | 'max') => (e: React.MouseEvent) => {
			e.preventDefault();
			setDragging(type);
			const value = calculateValue(e.clientX);
			updateValue(type, value);
		},
		[setDragging, updateValue, calculateValue],
	);

	const handleTouchStart = useCallback(
		(type: 'min' | 'max') => (e: React.TouchEvent) => {
			setDragging(type);
			const touch = e.touches[0];
			const value = calculateValue(touch.clientX);
			updateValue(type, value);
		},
		[setDragging, calculateValue, updateValue],
	);

	const handleMove = useCallback(
		(clientX: number) => {
			if (!dragging) return;
			const value = calculateValue(clientX);
			updateValue(dragging, value);
		},
		[dragging, calculateValue, updateValue],
	);
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!dragging) return;
			e.preventDefault();
			handleMove(e.clientX);
		},
		[handleMove, dragging],
	);
	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!dragging) return;
			handleMove(e.touches[0].clientX);
		},
		[handleMove, dragging],
	);
	const handleMouseUp = useCallback(() => {
		setDragging(null);
	}, []);

	useEffect(() => {
		onChange?.(localValues);
	}, [localValues.min, localValues.max]);

	return {
		handleMouseUp,
		handleTouchMove,
		handleMouseMove,
		handleTouchStart,
		handleMouseDown,
		localValues,
		containerRef,
	};
};
