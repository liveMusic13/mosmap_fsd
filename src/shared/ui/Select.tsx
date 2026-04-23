'use client';

import Image from 'next/image';
import { FC, useRef, useState } from 'react';

import { useClickOutside } from '../hooks/useClickOutside';
import { ISelectOptions } from '../types/shared.type';

interface IProps {
	options: ISelectOptions[];
	value?: number;
	onChange?: (value: number) => void;
	classSelect?: string;
	classText?: string;
	position?: 'static' | 'absolute';
	positionOptions?: 'top' | 'bottom';
}

const Select: FC<IProps> = ({
	options,
	onChange,
	value,
	classSelect,
	classText,
	position,
	positionOptions = 'bottom',
}) => {
	const selectRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const selectedOption = options.find(
		opt => Number(opt.value) === Number(value),
	);

	useClickOutside(selectRef, () => setIsOpen(false));

	const handleOpenOptions = () => setIsOpen(p => !p);
	const handleChoiceOption = (option: ISelectOptions) => {
		setIsOpen(false);
		onChange?.(option.value);
	};

	return (
		<div className={`flex flex-col gap-1 relative`} ref={selectRef}>
			{positionOptions === 'top' && isOpen && (
				<div
					className={`max-h-32 scrollbar-custom overflow-x-hidden overflow-y-auto bg-light-blue border border-border-gray rounded-sm p-0.5 xl:p-1.5 flex flex-col gap-0.5 ${position === 'absolute' ? 'absolute bottom-[110%] z-9999 w-full' : 'relative'}`}
				>
					{options.map((opt, ind) => (
						<p
							key={`${opt.value}${ind}`}
							className={`text-xl sm:text-xs hover:bg-white transition-colors hover:cursor-pointer ${
								Number(opt.value) === Number(value)
									? 'bg-white font-semibold'
									: '' // ✅ Подсветка выбранного
							}`}
							onClick={() => handleChoiceOption(opt)}
						>
							{opt.name}
						</p>
					))}
				</div>
			)}
			<div
				className={`bg-linear-to-b from-white to-[#f2f5fa] flex items-center justify-between rounded-sm border border-[#E1E6ED] p-1.5 xl:p-2.5 hover:cursor-pointer hover:border-primary transition-colors ${classSelect}`}
				onClick={handleOpenOptions}
			>
				<span className={`text-xs xl:text-sm ${classText}`}>
					{selectedOption?.name ?? 'Выберите значение'}
				</span>
				<Image
					src={'/images/icons/arrow_double.svg'}
					alt='logo'
					width={8} //HELP: минимальный размер для оптимизации
					height={16} //HELP: должен быть в тех же пропорциях, что и изображение
				/>
			</div>
			{positionOptions === 'bottom' && isOpen && (
				<div
					className={`max-h-32 scrollbar-custom overflow-x-hidden overflow-y-auto bg-light-blue border border-border-gray rounded-sm p-0.5 xl:p-1.5 flex flex-col gap-0.5 ${position === 'absolute' ? 'absolute top-[110%] z-9999 w-full' : 'relative'}`}
				>
					{options.map((opt, ind) => (
						<p
							key={`${opt.value}${ind}`}
							className={`text-xl sm:text-xs hover:bg-white transition-colors hover:cursor-pointer ${
								Number(opt.value) === Number(value)
									? 'bg-white font-semibold'
									: '' // ✅ Подсветка выбранного
							}`}
							onClick={() => handleChoiceOption(opt)}
						>
							{opt.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;
