import { FC, ReactNode } from 'react';

interface IPropsTitleForm {
	title: string;
	children: ReactNode;
	className?: string;
}

export const TitleItemForm: FC<IPropsTitleForm> = ({
	title,
	children,
	className,
}) => {
	return (
		<div className={`w-full ${className}`}>
			<h3 className=' text-xs font-bold mb-2'>{title}</h3>
			{children}
		</div>
	);
};
