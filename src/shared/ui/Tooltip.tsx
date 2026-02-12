import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface IProps {
	content: ReactNode;
	children: ReactNode;
	position?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
}

const Tooltip: FC<IProps> = ({
	children,
	content,
	delay = '250',
	position = 'top',
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [coords, setCoords] = useState({ top: 0, left: 0 });
	const timeoutRef = useRef<number | null>(null);
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const showTooltip = () => {
		timeoutRef.current = window.setTimeout(() => {
			setIsVisible(true);
		}, Number(delay));
	};

	const hideTooltip = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(false);
	};

	useEffect(() => {
		if (isVisible && triggerRef.current && tooltipRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			let top = 0;
			let left = 0;

			switch (position) {
				case 'top':
					top = triggerRect.top - tooltipRect.height - 8;
					left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
					break;
				case 'bottom':
					top = triggerRect.bottom + 8;
					left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
					break;
				case 'left':
					top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
					left = triggerRect.left - tooltipRect.width - 8;
					break;
				case 'right':
					top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
					left = triggerRect.right + 8;
					break;
			}

			setCoords({ top, left });
		}
	}, [isVisible, position]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const getArrowStyles = () => {
		const arrowSize = 6;
		const base = {
			position: 'absolute' as const,
			width: 0,
			height: 0,
			borderStyle: 'solid' as const,
		};

		switch (position) {
			case 'top':
				return {
					...base,
					bottom: -arrowSize,
					left: '50%',
					transform: 'translateX(-50%)',
					borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
					borderColor: '#1f2937 transparent transparent transparent',
				};
			case 'bottom':
				return {
					...base,
					top: -arrowSize,
					left: '50%',
					transform: 'translateX(-50%)',
					borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
					borderColor: 'transparent transparent #1f2937 transparent',
				};
			case 'left':
				return {
					...base,
					right: -arrowSize,
					top: '50%',
					transform: 'translateY(-50%)',
					borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
					borderColor: 'transparent transparent transparent #1f2937',
				};
			case 'right':
				return {
					...base,
					left: -arrowSize,
					top: '50%',
					transform: 'translateY(-50%)',
					borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
					borderColor: 'transparent #1f2937 transparent transparent',
				};
		}
	};

	return (
		<>
			<div
				ref={triggerRef}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
				className='inline-block'
			>
				{children}
			</div>

			{isVisible && (
				<div
					ref={tooltipRef}
					className='fixed z-9999 pointer-events-none'
					style={{
						top: `${coords.top}px`,
						left: `${coords.left}px`,
					}}
				>
					<div className='relative bg-gray-800 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap shadow-lg'>
						{content}
						<div style={getArrowStyles()} />
					</div>
				</div>
			)}
		</>
	);
};

export default Tooltip;
