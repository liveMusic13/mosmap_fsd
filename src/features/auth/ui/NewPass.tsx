import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useNewPass } from '../hooks/useNewPass';

import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

export interface IFormNewPass {
	password: string;
	newPassword: string;
}

export const NewPass: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isViewPassword, setIsViewPassword] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormNewPass>({ mode: 'onChange' });

	const { password, newPassword } = useWatch({ control });

	const isDisabled = password !== newPassword || !password || !newPassword;

	const { mutate, isSuccess, isPending, data } = useNewPass();

	useEffect(() => {
		if (isSuccess) setIsOpen(true);
	}, [isSuccess, data]);

	const handleClosePopup = () => setIsOpen(false);
	const handleViewPassword = () => setIsViewPassword(p => !p);

	const onSubmit = (data: IFormNewPass) => {
		const queryString = window.location.search;

		//HELP: Удаляем символ "?" в начале строки
		const token = queryString.startsWith('?')
			? queryString.slice(1)
			: queryString;

		mutate({ password: data.password, token });
	};

	const isSuccessNewPass = data?.status === 'OK';

	return (
		<>
			<form
				className='flex flex-col gap-2.5 w-full bg-light-blue border-2 border-light-blue mt-3.5 rounded-xl p-2 sm:p-9 overflow-y-auto
    max-h-full scrollbar-custom'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					{...register('password', {
						required: 'Это поле обязательно',
					})}
					error={errors.password?.message}
					placeholder='Пароль'
					type={!isViewPassword ? 'password' : 'text'}
					fullWidth
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
					positionImage='right'
					imageClickable
					imagePr={
						<Image
							src={'/images/icons/eye.svg'}
							alt='eye image'
							width={25}
							height={25}
							className='hover:cursor-pointer'
							onClick={handleViewPassword}
						/>
					}
				/>
				<Input
					placeholder='Подтверждение пароля'
					{...register('newPassword', {
						required: 'Это поле обязательно',
					})}
					error={errors.newPassword?.message}
					type={!isViewPassword ? 'password' : 'text'}
					fullWidth
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
					positionImage='right'
					imageClickable
					imagePr={
						<Image
							src={'/images/icons/eye.svg'}
							alt='eye image'
							width={25}
							height={25}
							className='hover:cursor-pointer'
							onClick={handleViewPassword}
						/>
					}
				/>
				<Button disabled={isDisabled}>Сменить пароль</Button>
			</form>

			<Popup open={isOpen} onClose={handleClosePopup}>
				<div className='flex flex-col gap-3 max-w-lg'>
					<h3
						className={`${isSuccessNewPass ? 'text-primary' : 'text-text-red'}`}
					>
						{isSuccessNewPass ? 'Успешно!' : 'Ошибка'}
					</h3>
					<Button onClick={handleClosePopup}>Закрыть</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Смена пароля...' />
		</>
	);
};
