import Image from 'next/image';
import { InputHTMLAttributes, forwardRef } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
	classNameLabel?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, IProps>(
	(
		{ checked, onChange, className, label, classNameLabel, id, ...rest },
		ref,
	) => {
		const inputId =
			id || `checkbox-${label?.replace(/\s+/g, '-').toLowerCase()}`;
		const checkedStyles = `${checked ? 'border-primary bg-primary group-hover:border-text-black' : 'border-border-checkbox-gray  group-hover:border-primary'}`;
		return (
			<label
				htmlFor={inputId} // Связываем клик по всей области с инпутом
				className='flex gap-1.5 items-center group'
				onClick={e => {
					const inputElement = e.currentTarget.querySelector('input');
					inputElement?.click();
				}}
			>
				<div
					className={`flex items-center justify-center shrink-0 w-5 h-5 select-none border rounded-md group-hover:cursor-pointer transition-colors ${checkedStyles} ${className}`}
				>
					{checked && (
						<Image
							src='/images/icons/checkbox.svg'
							alt='checkbox image'
							width={12}
							height={12}
						/>
					)}
					<input
						ref={ref}
						type='checkbox'
						checked={checked}
						onChange={onChange}
						className='hidden'
						{...rest}
					/>
				</div>
				{label && (
					<span
						className={`text-sm font-medium group-hover:text-primary group-hover:cursor-pointer transition-colors ${classNameLabel}`}
					>
						{label}
					</span>
				)}
			</label>
		);
	},
);
