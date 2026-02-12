import { FC, RefObject, useEffect } from 'react';

interface IProps {
	min?: number;
	max?: number;
	handleMouseDown: (type: 'min' | 'max') => (e: React.MouseEvent) => void;
	handleTouchStart: (type: 'min' | 'max') => (e: React.TouchEvent) => void;
	handleMouseUp: () => void;
	handleTouchMove: (e: TouchEvent) => void;
	handleMouseMove: (e: MouseEvent) => void;
	localValues: { min: number; max: number };
	containerRef: RefObject<HTMLDivElement | null>;
}

export const Range: FC<IProps> = ({
	min = 0,
	max = 100,
	handleMouseDown,
	handleTouchStart,
	handleTouchMove,
	handleMouseMove,
	handleMouseUp,
	localValues,
	containerRef,
}) => {
	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('touchmove', handleTouchMove);
		document.addEventListener('touchend', handleMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp, handleTouchMove]);

	const minPosition = ((localValues.min - min) / (max - min)) * 100;
	const maxPosition = ((localValues.max - min) / (max - min)) * 100;

	return (
		<div ref={containerRef} className='flex items-center gap-1.5 sm:gap-4'>
			<span className='text-base'>от</span>

			<div className='relative w-full h-17.5 py-1 touch-none flex items-center'>
				{/* Track */}
				<div className='absolute inset-x-0 top-1/2 h-px bg-gray-300/60 -translate-y-1/2 rounded' />

				{/* Active range */}
				<div
					className='absolute top-1/2 h-0.5 bg-primary -translate-y-1/2 z-10'
					style={{
						left: `${minPosition}%`,
						right: `${100 - maxPosition}%`,
					}}
				/>

				{/* Min thumb */}
				<div
					className='absolute top-1/2 z-20 w-3.5 h-3.5 sm:w-7 sm:h-7
            bg-white border border-primary rounded-full
            -translate-x-1/2 -translate-y-1/2
            cursor-pointer transition-transform hover:scale-110'
					style={{ left: `${minPosition}%` }}
					onMouseDown={handleMouseDown('min')}
					onTouchStart={handleTouchStart('min')}
				>
					<span
						className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2
            bg-white px-1 py-0.5 text-xs text-primary rounded shadow whitespace-nowrap'
					>
						{localValues.min}
					</span>
				</div>

				{/* Max thumb */}
				<div
					className='absolute top-1/2 z-20 w-3.5 h-3.5 sm:w-7 sm:h-7
            bg-white border border-primary rounded-full
            -translate-x-1/2 -translate-y-1/2
            cursor-pointer transition-transform hover:scale-110'
					style={{ left: `${maxPosition}%` }}
					onMouseDown={handleMouseDown('max')}
					onTouchStart={handleTouchStart('max')}
				>
					<span
						className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2
            bg-white px-1 py-0.5 text-xs text-primary rounded shadow whitespace-nowrap'
					>
						{localValues.max}
					</span>
				</div>
			</div>

			<span className='text-base'>до</span>
		</div>
	);
};
