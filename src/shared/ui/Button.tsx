import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	variant?:
		| 'green'
		| 'transparent'
		| 'transparent-gray'
		| 'transparent-red'
		| 'icon';
	className?: string;
}

const Button: FC<IProps> = ({
	children,
	variant = 'green',
	className = '',
	...rest
}) => {
	let styles = '';

	if (variant === 'green') {
		styles =
			'w-full h-8 xl:h-10 bg-primary text-white enabled:hover:text-primary enabled:hover:border-1 enabled:hover:border-primary enabled:hover:bg-transparent';
	} else if (variant === 'transparent') {
		styles =
			'w-full h-8 xl:h-10 border-1 border-primary bg-transparent text-primary enabled:hover:text-white enabled:hover:bg-primary';
	} else if (variant === 'icon') {
		styles = 'w-5 h-8 xl:h-10 p-0!';
	} else if (variant === 'transparent-gray') {
		styles =
			'w-fit h-7 py-1 px-2! text-placeholder-input shadow-custom-green enabled:hover:border-1 enabled:hover:border-primary';
	} else if (variant === 'transparent-red') {
		styles =
			'w-fit h-7 py-1 px-2! text-text-red shadow-custom-green enabled:hover:border-1 enabled:hover:border-primary';
	} else {
		return null;
	}

	return (
		<button
			className={`rounded-md px-4.5 text-xs xl:text-sm font-semibold enabled:hover:cursor-pointer transition-all disabled:opacity-50 ${styles} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
