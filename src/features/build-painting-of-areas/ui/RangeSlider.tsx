// 'use client';

// import { FC, useRef, useState } from 'react';
// import {
// 	Control,
// 	UseFormSetValue,
// 	useFieldArray,
// 	useWatch,
// } from 'react-hook-form';

// import { TRangeFormValues } from '../types';

// import { WrapperColorPicker } from './WrapperColorPicker';
// import Button from '@/shared/ui/Button';

// interface Props {
// 	control: Control<TRangeFormValues>;
// 	setValue: UseFormSetValue<TRangeFormValues>;
// 	maxValue?: number;
// }

// export const RangeSlider: FC<Props> = ({
// 	control,
// 	setValue,
// 	maxValue = 1000,
// }) => {
// 	const { fields, append, remove, update } = useFieldArray({
// 		control,
// 		name: 'ranges',
// 	});

// 	const ranges = useWatch({ control, name: 'ranges' }) ?? [];
// 	console.log('ranges', ranges);
// 	const sliderRef = useRef<HTMLDivElement>(null);
// 	const [dragging, setDragging] = useState<number | null>(null);

// 	/* ----------------------------- DRAG ----------------------------- */

// 	const handleMove = (clientX: number) => {
// 		if (dragging === null || !sliderRef.current) return;

// 		const rect = sliderRef.current.getBoundingClientRect();

// 		const percent = (clientX - rect.left) / rect.width;

// 		const newValue = Math.round(percent * maxValue);

// 		changeMax(dragging, newValue);
// 	};

// 	const changeMax = (index: number, value: number) => {
// 		const current = [...ranges];

// 		const clamped = Math.max(
// 			current[index].min,
// 			Math.min(value, current[index + 1]?.max ?? maxValue),
// 		);

// 		setValue(`ranges.${index}.max`, clamped);

// 		if (index < current.length - 1) {
// 			setValue(`ranges.${index + 1}.min`, clamped + 1);
// 		}
// 	};

// 	/* ----------------------------- ACTIONS ----------------------------- */

// 	const addRange = () => {
// 		const last = ranges[ranges.length - 1];
// 		if (last) {
// 			const newMin = last.max + 1;

// 			append({ min: newMin, max: newMin + 1, color: '#000' });
// 		} else {
// 			append({ min: 0, max: 1, color: '#000' });
// 		}
// 	};

// 	const deleteRange = (index: number) => {
// 		remove(index);

// 		const updated = [...ranges];

// 		if (index === 0 && updated[1]) {
// 			setValue('ranges.0.min', 0);
// 		}
// 	};

// 	/* ----------------------------- RENDER ----------------------------- */

// 	return (
// 		<div
// 			className='w-full max-w-xl mx-auto select-none '
// 			onMouseMove={e => handleMove(e.clientX)}
// 			onMouseUp={() => setDragging(null)}
// 		>
// 			{/* BAR */}
// 			<div
// 				ref={sliderRef}
// 				className='relative h-0.5 w-full rounded-full bg-gray-300 mb-6'
// 			>
// 				{fields.map((field, i) => {
// 					const r = ranges[i];

// 					if (!r) return null;

// 					return (
// 						<div
// 							key={field.id}
// 							onMouseDown={() => setDragging(i)}
// 							style={{ left: `${(r.max / maxValue) * 100}%` }}
// 							className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7
//             bg-white border border-primary rounded-full cursor-grab active:cursor-grabbing shadow-md'
// 						>
// 							<span
// 								className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2
//             bg-white px-1 py-0.5 text-lg sm:text-xs text-primary rounded shadow whitespace-nowrap'
// 							>
// 								{r.max}
// 							</span>
// 						</div>
// 					);
// 				})}
// 			</div>

// 			{/* INPUTS */}
// 			<div className='space-y-2'>
// 				{fields.map((field, i) => {
// 					const r = ranges[i];

// 					if (!r) return null;

// 					return (
// 						<div
// 							key={field.id}
// 							className='flex items-center gap-1 text-lg sm:text-sm '
// 						>
// 							<span className='text-xs'>от</span>
// 							<input
// 								value={r.min}
// 								readOnly
// 								className='w-27 sm:w-18 border border-border-gray rounded pl-2  bg-gray-100'
// 							/>
// 							<span className='text-xs'>до</span>
// 							<input
// 								type='number'
// 								value={r.max}
// 								onChange={e => changeMax(i, Number(e.target.value))}
// 								className='w-27 sm:w-18 border border-border-gray rounded pl-2 '
// 							/>
// 							<span className='text-xs'>-</span>
// 							<WrapperColorPicker r={r} index={i} setValue={setValue} />
// 							<span className='text-xs'>-</span>

// 							<button
// 								type='button'
// 								onClick={() => deleteRange(i)}
// 								className='px-4 sm:px-2 py-1 rounded bg-text-red text-white text-lg sm:text-sm'
// 							>
// 								✕
// 							</button>
// 						</div>
// 					);
// 				})}
// 			</div>

// 			<Button
// 				variant='transparent'
// 				type='button'
// 				onClick={addRange}
// 				className='mt-4'
// 			>
// 				Добавить
// 			</Button>
// 		</div>
// 	);
// };

'use client';

import { FC } from 'react';
import {
	Control,
	UseFormSetValue,
	useFieldArray,
	useWatch,
} from 'react-hook-form';

import { useRangeSlider } from '../hooks/useRangeSlider';
import { TRangeFormValues } from '../types';

import { WrapperColorPicker } from './WrapperColorPicker';
import Button from '@/shared/ui/Button';

interface Props {
	control: Control<TRangeFormValues>;
	setValue: UseFormSetValue<TRangeFormValues>;
	maxValue?: number;
}

export const RangeSlider: FC<Props> = ({
	control,
	setValue,
	maxValue = 1000,
}) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'ranges',
	});

	const ranges = useWatch({ control, name: 'ranges' }) ?? [];

	const {
		sliderRef,
		dragging,
		setDragging,
		changeMax,
		handleMouseMove,
		handleMouseUp,
		handleTouchMove,
		handleTouchEnd,
		addRange,
		deleteRange,
	} = useRangeSlider({ ranges, maxValue, setValue, append, remove });

	/* ----------------------------- RENDER ----------------------------- */

	return (
		<div
			className='w-full max-w-xl mx-auto select-none'
			onMouseMove={e => handleMouseMove(e.clientX)}
			onMouseUp={handleMouseUp}
			// touch-события на контейнере — нужен passive:false для preventDefault внутри
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{/* BAR */}
			<div
				ref={sliderRef}
				className='relative h-0.5 w-full rounded-full bg-gray-300 mb-6'
			>
				{fields.map((field, i) => {
					const r = ranges[i];

					if (!r) return null;

					return (
						<div
							key={field.id}
							style={{ left: `${(r.max / maxValue) * 100}%` }}
							className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7
                bg-white border border-primary rounded-full cursor-grab active:cursor-grabbing shadow-md
                touch-none'
							onMouseDown={() => setDragging(i)}
							onTouchStart={() => setDragging(i)}
						>
							<span
								className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2
                bg-white px-1 py-0.5 text-lg sm:text-xs text-primary rounded shadow whitespace-nowrap'
							>
								{r.max}
							</span>
						</div>
					);
				})}
			</div>

			{/* INPUTS */}
			<div className='space-y-2'>
				{fields.map((field, i) => {
					const r = ranges[i];

					if (!r) return null;

					return (
						<div
							key={field.id}
							className='flex items-center gap-1 text-lg sm:text-sm'
						>
							<span className='text-xs'>от</span>
							<input
								value={r.min}
								readOnly
								className='w-27 sm:w-18 border border-border-gray rounded pl-2 bg-gray-100'
							/>
							<span className='text-xs'>до</span>
							<input
								type='number'
								value={r.max}
								onChange={e => changeMax(i, Number(e.target.value))}
								className='w-27 sm:w-18 border border-border-gray rounded pl-2'
							/>
							<span className='text-xs'>-</span>
							<WrapperColorPicker r={r} index={i} setValue={setValue} />
							<span className='text-xs'>-</span>

							<button
								type='button'
								onClick={() => deleteRange(i)}
								className='px-4 sm:px-2 py-1 rounded bg-text-red text-white text-lg sm:text-sm'
							>
								✕
							</button>
						</div>
					);
				})}
			</div>

			<Button
				variant='transparent'
				type='button'
				onClick={addRange}
				className='mt-4 min-h-12 text-sm! sm:text-xs! sm:min-h-8'
			>
				Добавить
			</Button>
		</div>
	);
};
