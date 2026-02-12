import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '../hooks/useClickOutside';
import { useMounted } from '../hooks/useMounted';

interface IProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Popup: FC<IProps> = ({ onClose, children, open }) => {
	const ref = useRef(null);
	const mounted = useMounted();

	useClickOutside(ref, onClose);

	if (!mounted) return null;

	return createPortal(
		<div
			className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-all duration-300
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
		>
			{/* backdrop */}
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			/>

			{/* modal content */}
			<div
				ref={ref}
				className={`
          rounded-xl
          shadow-custom-green p-3 xl:p-4
          bg-white
          relative z-999999
          transition-all duration-300
          ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}
        `}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Popup;
