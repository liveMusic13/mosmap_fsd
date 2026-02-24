import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SUBTITLES_AUTH } from '../constants';
import { useSignIn } from '../hooks/useSignIn';

import Button from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';

interface ILoginForm {
	login: string;
	password: string;
}

export const SignIn: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({ mode: 'onChange' });

	const { mutate } = useSignIn();

	const onSubmit = (data: ILoginForm) => {
		mutate(data);
	};

	const isDisabledButton = !!(
		errors.login?.message || errors.password?.message
	);

	return (
		<form
			className='flex flex-col gap-2.5 bg-light-blue border-2 border-light-blue w-full mt-3.5 rounded-xl p-2 sm:p-9 overflow-y-auto
     sm:max-h-full scrollbar-custom'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				{...register('login', {
					required: 'Это поле обязательно',
				})}
				error={errors.login?.message}
				placeholder='Логин'
				fullWidth
				className='bg-white h-16.5 text-[1rem] xl:text-lg'
			/>
			<Input
				placeholder='Пароль'
				{...register('password', {
					required: 'Это поле обязательно',
				})}
				error={errors.password?.message}
				fullWidth
				className='bg-white h-16.5 text-[1rem] xl:text-lg'
			/>
			<div className='flex flex-col sm:flex-row sm:flex-wrap justify-between gap-5 sm:gap-2 sm:items-center'>
				<Checkbox label='Показать пароль' />
				<Link
					href='/restore'
					className='font-medium text-text-blue text-sm hover:text-text-black transition-colors'
				>
					{SUBTITLES_AUTH.restore}
				</Link>
			</div>

			{/* <HStack className=' justify-between'>
				<Checkbox label='Показать пароль' />
				<Link
					href='/restore'
					className='font-medium text-text-blue text-sm hover:text-text-black transition-colors'
				>
					{SUBTITLES_AUTH.restore}
				</Link>
			</HStack> */}
			<Button className='mt-3.5' disabled={isDisabledButton}>
				Войти
			</Button>
		</form>
	);
};
