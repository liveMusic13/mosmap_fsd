// import { useRef, useState } from 'react';
// import { UseFormSetValue } from 'react-hook-form';
// import { TRangeFormValues } from '../types';
// interface UseRangeSliderParams {
// 	ranges: TRangeFormValues['ranges'];
// 	maxValue: number;
// 	setValue: UseFormSetValue<TRangeFormValues>;
// 	append: (value: TRangeFormValues['ranges'][number]) => void;
// 	remove: (index: number) => void;
// }
// export const useRangeSlider = ({
// 	ranges,
// 	maxValue,
// 	setValue,
// 	append,
// 	remove,
// }: UseRangeSliderParams) => {
// 	const sliderRef = useRef<HTMLDivElement>(null);
// 	const [dragging, setDragging] = useState<number | null>(null);
// 	/* ----------------------------- HELPERS ----------------------------- */
// 	const getValueFromClientX = (clientX: number): number => {
// 		if (!sliderRef.current) return 0;
// 		const rect = sliderRef.current.getBoundingClientRect();
// 		const percent = (clientX - rect.left) / rect.width;
// 		return Math.round(percent * maxValue);
// 	};
// 	/* ----------------------------- CHANGE ----------------------------- */
// 	const changeMax = (index: number, value: number) => {
// 		const clamped = Math.max(
// 			ranges[index].min,
// 			Math.min(value, ranges[index + 1]?.max ?? maxValue),
// 		);
// 		setValue(`ranges.${index}.max`, clamped);
// 		if (index < ranges.length - 1) {
// 			setValue(`ranges.${index + 1}.min`, clamped + 1);
// 		}
// 	};
// 	/* ----------------------------- MOUSE ----------------------------- */
// 	const handleMouseMove = (clientX: number) => {
// 		if (dragging === null) return;
// 		changeMax(dragging, getValueFromClientX(clientX));
// 	};
// 	const handleMouseUp = () => {
// 		setDragging(null);
// 	};
// 	/* ----------------------------- TOUCH ----------------------------- */
// 	const handleTouchMove = (e: React.TouchEvent) => {
// 		if (dragging === null) return;
// 		// Блокируем скролл страницы пока двигаем ползунок
// 		e.preventDefault();
// 		const touch = e.touches[0];
// 		changeMax(dragging, getValueFromClientX(touch.clientX));
// 	};
// 	const handleTouchEnd = () => {
// 		setDragging(null);
// 	};
// 	/* ----------------------------- ACTIONS ----------------------------- */
// 	const addRange = () => {
// 		const last = ranges[ranges.length - 1];
// 		if (last) {
// 			const newMin = last.max + 1;
// 			append({ min: newMin, max: newMin + 1, color: '#000000' });
// 		} else {
// 			append({ min: 0, max: 1, color: '#000000' });
// 		}
// 	};
// 	const deleteRange = (index: number) => {
// 		remove(index);
// 		// Если удалили первый — новый первый начинается с 0
// 		if (index === 0 && ranges[1]) {
// 			setValue('ranges.0.min', 0);
// 		}
// 	};
// 	return {
// 		sliderRef,
// 		dragging,
// 		setDragging,
// 		changeMax,
// 		handleMouseMove,
// 		handleMouseUp,
// 		handleTouchMove,
// 		handleTouchEnd,
// 		addRange,
// 		deleteRange,
// 	};
// };
import { useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { TRangeFormValues } from '../types';

interface UseRangeSliderParams {
	ranges: TRangeFormValues['ranges'];
	maxValue: number;
	setValue: UseFormSetValue<TRangeFormValues>;
	append: (value: TRangeFormValues['ranges'][number]) => void;
	remove: (index: number) => void;
}

export const useRangeSlider = ({
	ranges,
	maxValue,
	setValue,
	append,
	remove,
}: UseRangeSliderParams) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [dragging, setDragging] = useState<number | null>(null);
	// Сырые значения пока пользователь печатает
	const [pendingValues, setPendingValues] = useState<Record<number, string>>(
		{},
	);

	/* ----------------------------- HELPERS ----------------------------- */

	const getValueFromClientX = (clientX: number): number => {
		if (!sliderRef.current) return 0;

		const rect = sliderRef.current.getBoundingClientRect();
		const percent = (clientX - rect.left) / rect.width;

		return Math.round(percent * maxValue);
	};

	/* ----------------------------- CHANGE ----------------------------- */

	// const changeMax = (index: number, value: number) => {
	// 	const clamped = Math.max(
	// 		ranges[index].min,
	// 		Math.min(value, ranges[index + 1]?.max ?? maxValue),
	// 	);

	// 	setValue(`ranges.${index}.max`, clamped);

	// 	if (index < ranges.length - 1) {
	// 		setValue(`ranges.${index + 1}.min`, clamped + 1);
	// 	}
	// };

	// Вызывается onChange — просто сохраняем сырую строку, без проверок

	const changeMax = (index: number, value: number) => {
		const clamped = Math.max(
			ranges[index].min + 1,
			Math.min(value, maxValue), // ограничиваем только глобальным maxValue
		);

		setValue(`ranges.${index}.max`, clamped);

		let prevMax = clamped;

		for (let i = index + 1; i < ranges.length; i++) {
			const newMin = prevMax + 1;

			setValue(`ranges.${i}.min`, newMin);

			if (ranges[i].max <= newMin) {
				const newMax = Math.min(newMin + 1, maxValue);
				setValue(`ranges.${i}.max`, newMax);
				prevMax = newMax;
			} else {
				prevMax = ranges[i].max;
			}
		}
	};

	const handleMaxInputChange = (index: number, raw: string) => {
		setPendingValues(prev => ({ ...prev, [index]: raw }));
	};

	// Вызывается onBlur — нормализуем и записываем в форму
	const handleMaxInputBlur = (index: number) => {
		const raw = pendingValues[index];

		if (raw !== undefined) {
			const parsed = Number(raw);

			if (!isNaN(parsed)) {
				changeMax(index, parsed);
			}

			// Убираем pending — инпут вернётся к значению из формы
			setPendingValues(prev => {
				const next = { ...prev };
				delete next[index];
				return next;
			});
		}
	};

	/* ----------------------------- MOUSE ----------------------------- */

	const handleMouseMove = (clientX: number) => {
		if (dragging === null) return;

		changeMax(dragging, getValueFromClientX(clientX));
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	/* ----------------------------- TOUCH ----------------------------- */

	const handleTouchMove = (e: React.TouchEvent) => {
		if (dragging === null) return;

		e.preventDefault();

		const touch = e.touches[0];
		changeMax(dragging, getValueFromClientX(touch.clientX));
	};

	const handleTouchEnd = () => {
		setDragging(null);
	};

	/* ----------------------------- ACTIONS ----------------------------- */

	const addRange = () => {
		const last = ranges[ranges.length - 1];

		if (last) {
			const newMin = last.max + 1;
			append({ min: newMin, max: newMin + 1, color: '#000000' });
		} else {
			append({ min: 0, max: 1, color: '#000000' });
		}
	};

	const deleteRange = (index: number) => {
		remove(index);

		if (index === 0 && ranges[1]) {
			setValue('ranges.0.min', 0);
		}
	};

	return {
		sliderRef,
		dragging,
		setDragging,
		pendingValues,
		changeMax,
		handleMaxInputChange,
		handleMaxInputBlur,
		handleMouseMove,
		handleMouseUp,
		handleTouchMove,
		handleTouchEnd,
		addRange,
		deleteRange,
	};
};
