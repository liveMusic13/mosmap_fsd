import { FC, useEffect, useState } from 'react';

import { useConfirm } from '../hooks/useConfirm';

import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';

export const Confirm: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { mutate, isSuccess, data } = useConfirm();

	useEffect(() => {
		//HELP: Получаем полную строку запроса из URL
		const queryString = window.location.search;

		//HELP: Удаляем символ "?" в начале строки
		const token = queryString.startsWith('?')
			? queryString.slice(1)
			: queryString;

		if (token) {
			console.log('Токен:', token);
			mutate({ token });
		} else {
			console.error('Токен не найден в адресной строке');
		}
	}, []);

	useEffect(() => {
		if (isSuccess) setIsOpen(true);
	}, [isSuccess]);

	const handleClosePopup = () => setIsOpen(false);

	const errorConfirm = data?.status !== 'OK';

	return (
		<>
			<Popup open={isOpen} onClose={handleClosePopup}>
				<div className='flex flex-col gap-3 max-w-lg'>
					<h3 className={`${errorConfirm ? 'text-primary' : 'text-text-red'}`}>
						{errorConfirm
							? 'Подтверждение прошло успешно!'
							: 'Подтверждение не прошло'}
					</h3>
					<Button onClick={handleClosePopup}>Закрыть</Button>
				</div>
			</Popup>
		</>
	);
};
