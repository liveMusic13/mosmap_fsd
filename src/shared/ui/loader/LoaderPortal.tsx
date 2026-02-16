'use client';

import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Loader } from './Loader';

interface IProps {
	isLoading: boolean;
	message?: string;
}

export const LoaderPortal: FC<IProps> = ({
	isLoading,
	message = 'Загрузка...',
}) => {
	const [isVisible, setIsVisible] = useState(false);

	// Для плавного выезда
	useEffect(() => {
		if (isLoading) {
			// Даем рендеру время на вставку в DOM перед анимацией
			const timer = setTimeout(() => setIsVisible(true), 50);
			return () => clearTimeout(timer);
		} else {
			setIsVisible(false);
		}
	}, [isLoading]);

	// Если портал не нужен, возвращаем null
	if (!isLoading && !isVisible) return null;

	return createPortal(
		<div
			className={`flex gap-2 fixed bottom-5 right-5 z-9999 bg-white px-4 py-2 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
				isVisible ? 'translate-x-0' : 'translate-x-32'
			}`}
		>
			<span>{message}</span>
			<Loader className='w-5! h-5!' />
		</div>,
		document.body,
	);
};
