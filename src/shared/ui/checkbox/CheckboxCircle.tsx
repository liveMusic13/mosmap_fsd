'use client';

import { FC, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckboxCircle: FC<IProps> = ({
	checked = false,
	onChange,
	value,
	...props
}) => {
	return (
		<label
			className={`block w-5 h-5 rounded-full p-0.5 cursor-pointer group 
        ${props.disabled ? 'bg-text-disabled pointer-events-none' : 'border border-primary'}`}
		>
			<input
				type='checkbox'
				className='hidden' // Инпут скрыт, но label проксирует клик на него
				checked={checked}
				onChange={onChange}
				{...props}
			/>
			<div
				className={`w-full h-full rounded-full transition-colors 
          ${
						checked
							? 'bg-primary group-hover:bg-transparent group-hover:border group-hover:border-primary'
							: 'bg-transparent group-hover:border group-hover:border-primary'
					}`}
			/>
		</label>
	);
};
