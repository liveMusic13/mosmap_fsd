import { FC } from 'react';

interface IProps {
	className?: string;
	orientation?: 'horizontal' | 'vertical';
}

const Line: FC<IProps> = ({ className, orientation = 'vertical' }) => {
	const WHStyle = orientation === 'vertical' ? 'w-px h-10' : 'w-full h-px';

	return <div className={`${WHStyle} bg-text-black  ${className}`} />;
};

export default Line;
