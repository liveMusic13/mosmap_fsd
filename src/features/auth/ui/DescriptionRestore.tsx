import Link from 'next/link';
import { FC } from 'react';

export const DescriptionRestore: FC = () => {
	return (
		<div className='sm:max-w-xs max-w-auto text-xs flex flex-col items-center gap-3'>
			<p className='flex items-center gap-1'>
				<span className='font-bold'>Уже зарегистрировались?</span>
				<Link href={'/auth'} className='text-blue-500'>
					Войти
				</Link>
			</p>
			<p className='text-center'>
				Укажите логин и Email, с которого вы регистрировались. На этот адрес
				придет письмо с ссылкой на сброс пароля
			</p>
		</div>
	);
};
