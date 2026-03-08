'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SUBTITLES_AUTH } from '../constants';
import { useSignIn } from '../hooks/useSignIn';

import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

interface ILoginForm {
	login: string;
	password: string;
}

export const SignIn: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({ mode: 'onChange' });

	const { mutate, isSuccess, data, isPending } = useSignIn();

	useEffect(() => {
		if (isSuccess) {
			if (!data.success) {
				setIsOpen(true);
			}
		}
	}, [isSuccess, data]);

	const onClose = () => setIsOpen(false);
	const onSubmit = (data: ILoginForm) => {
		mutate(data);
	};

	const isDisabledButton = !!(
		errors.login?.message || errors.password?.message
	);

	return (
		<>
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
					type={showPassword ? 'text' : 'password'}
					{...register('password', {
						required: 'Это поле обязательно',
					})}
					error={errors.password?.message}
					fullWidth
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
				/>
				<div className='flex flex-col sm:flex-row sm:flex-wrap justify-between gap-5 sm:gap-2 sm:items-center'>
					<Checkbox
						label='Показать пароль'
						checked={showPassword}
						onChange={e => setShowPassword(e.target.checked)}
						onClick={e => e.stopPropagation()}
					/>
					<Link
						href='/restore'
						className='font-medium text-text-blue text-sm hover:text-text-black transition-colors'
					>
						{SUBTITLES_AUTH.restore}
					</Link>
				</div>
				<Button className='mt-3.5' disabled={isDisabledButton}>
					Войти
				</Button>
			</form>
			<Popup open={isOpen} onClose={onClose}>
				<div>
					<h3 className='text-text-red font-medium text-xl'>Ошибка!</h3>
					<p className='text-sm'>
						{
							(data?.responseData as { error: boolean; message: string })
								?.message
						}
					</p>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Выполняется вход...' />
		</>
	);
};
