import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: FieldError | string;
	helperText?: string;
	variant?: 'default' | 'filled' | 'outlined';
	fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, IProps>(
	(
		{
			label,
			error,
			helperText,
			variant = 'default',
			fullWidth = false,
			className = '',
			disabled,
			...rest
		},
		ref
	) => {
		const errorMessage = typeof error === 'string' ? error : error?.message;
		const hasError = !!error;

		const baseStyles =
			'px-4 py-2 rounded-lg transition-all duration-200 outline-none placeholder:text-placeholder-input';

		const variantStyles = {
			default:
				'border placeholder:text-text-disabled border-border-input-gray focus:border-primary focus:ring-2 focus:ring-emerald-400',
			filled: 'bg-gray-100 border-0 focus:bg-border-buttons-gray',
			outlined: 'border-2 border-gray-300 focus:border-blue-500',
		};

		const stateStyles = hasError
			? 'border-text-red focus:border-text-red focus:ring-red-200'
			: '';

		const disabledStyles = disabled
			? 'bg-gray-100 cursor-not-allowed opacity-60'
			: '';

		const widthStyles = fullWidth ? 'w-full' : '';

		return (
			<div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
				{label && (
					<label className='text-sm font-bold text-text-black '>{label}</label>
				)}
				<div className='relative flex items-center'>
					<textarea
						ref={ref}
						disabled={disabled}
						className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${stateStyles}
            ${disabledStyles}
            ${widthStyles}
            ${className}
          `}
						{...rest}
					/>
				</div>

				{(errorMessage || helperText) && (
					<span
						className={`text-xs ${hasError ? 'text-text-red' : 'text-gray-500'}`}
					>
						{errorMessage || helperText}
					</span>
				)}
			</div>
		);
	}
);
