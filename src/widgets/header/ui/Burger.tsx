import { FC } from 'react';

interface IProps {
	isOpen: boolean;
	handleClick: () => void;
}

const Burger: FC<IProps> = ({ isOpen, handleClick }) => {
	return (
		<button
			className='sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative'
			onClick={handleClick}
			aria-label='Toggle menu'
		>
			<span
				className={`w-7 h-0.5 bg-primary transition-all duration-300 ease-in-out ${
					isOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
				}`}
			></span>
			<span
				className={`w-7 h-0.5 bg-primary transition-all duration-300 ease-in-out ${
					isOpen ? 'opacity-0' : 'opacity-100'
				}`}
			></span>
			<span
				className={`w-7 h-0.5 bg-primary transition-all duration-300 ease-in-out ${
					isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
				}`}
			></span>
		</button>
	);
};

export default Burger;
