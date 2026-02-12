import { FC, ReactNode } from 'react';

interface IProps {
	children: ReactNode;
	className?: string;
}

export const HStack: FC<IProps> = ({ children, className }) => {
	return (
		<div className={`flex flex-wrap justify-between items-center ${className}`}>
			{children}
		</div>
	);
};

export const VStack: FC<IProps> = ({ children, className }) => {
	return (
		<div className={`flex flex-col items-start justify-center ${className}`}>
			{children}
		</div>
	);
};
