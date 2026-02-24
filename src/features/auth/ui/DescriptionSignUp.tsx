import Link from 'next/link';
import { FC } from 'react';

const DescriptionSignUp: FC = () => {
	return (
		<div className='sm:max-w-xs max-w-auto text-xs flex flex-col items-center gap-3'>
			<p className='flex items-center gap-1'>
				<span className='font-bold'>Уже зарегистрировались?</span>
				<Link href={'/auth'} className='text-blue-500'>
					Войти
				</Link>
			</p>
			<p className='text-center'>
				После регистрации на указанный вами Email придет письмо с подтверждением
				регистрации. Вам необходимо будет перейти по ссылке внутри письма
			</p>
		</div>
	);
};

export default DescriptionSignUp;
