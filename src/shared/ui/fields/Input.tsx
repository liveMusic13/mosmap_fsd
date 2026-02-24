import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: FieldError | string;
	helperText?: string;
	variant?: 'default' | 'filled' | 'outlined';
	fullWidth?: boolean;
	imagePr?: ReactNode;
	positionImage?: 'left' | 'right';
	imageClickable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IProps>(
	(
		{
			label,
			error,
			helperText,
			variant = 'default',
			fullWidth = false,
			className = '',
			type = 'text',
			imageClickable = false,
			disabled,
			imagePr,
			positionImage,
			...rest
		},
		ref,
	) => {
		const errorMessage = typeof error === 'string' ? error : error?.message;
		const hasError = !!error;

		const baseStyles =
			'px-4 py-2 rounded-lg transition-all duration-200 outline-none placeholder:text-placeholder-input';

		const variantStyles = {
			default:
				'border border-border-input-gray focus:border-primary focus:ring-2 focus:ring-emerald-400',
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

		//HELP: Добавляем padding для картинки
		const paddingStyles = imagePr
			? positionImage === 'left'
				? 'pl-10'
				: 'pr-10'
			: '';

		return (
			<div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
				{label && (
					<label className='text-sm font-bold text-text-black '>{label}</label>
				)}
				<div className='relative flex items-center'>
					{positionImage === 'left' && imagePr && (
						<div
							className={`absolute left-3 flex items-center ${imageClickable ? '' : 'pointer-events-none'}`}
						>
							{imagePr}
						</div>
					)}

					<input
						ref={ref}
						type={type}
						disabled={disabled}
						className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${stateStyles}
            ${disabledStyles}
            ${widthStyles}
            ${paddingStyles}
            ${className}
          `}
						{...rest}
					/>

					{positionImage === 'right' && imagePr && (
						<div
							className={`absolute right-3 flex items-center ${imageClickable ? '' : 'pointer-events-none'}`}
						>
							{imagePr}
						</div>
					)}
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
	},
);

Input.displayName = 'Input';
