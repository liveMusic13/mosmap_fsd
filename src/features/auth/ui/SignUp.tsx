import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useRegistration } from '../hooks/useRegistration';

import DescriptionSignUp from './DescriptionSignUp';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Input, TextArea } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

export interface IFormSignUp {
	login: string;
	password: string;
	email: string;
	name_map: string;
	description_map: string;
}

//TODO: закончить регистрацию
export const SignUp: FC = () => {
	const [isViewPassword, setIsViewPassword] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { register, control, handleSubmit } = useForm<IFormSignUp>({
		mode: 'onChange',
	});

	const { email, login, password } = useWatch({
		control,
	});

	const { mutate, isError, error, isPending, data, isSuccess } =
		useRegistration();

	useEffect(() => {
		if (isSuccess) {
			setIsOpen(true);
		}
	}, [isSuccess, data]);

	const isDisabled = !login || !email || !password;

	const handleViewPassword = () => setIsViewPassword(p => !p);
	const handleClosePopup = () => setIsOpen(false);

	const onSubmit = (data: IFormSignUp) => {
		console.log(data);
		mutate(data);
	};

	const successRegistration = data?.status === 'OK';

	return (
		<>
			<form
				className='flex flex-col gap-2.5 bg-light-blue border-2 border-light-blue mt-3.5 rounded-xl p-2 sm:p-9 w-full sm:w-auto overflow-y-auto
    max-h-full scrollbar-custom'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					{...register('login', {
						required: 'Это поле обязательно',
					})}
					placeholder='Логин'
					fullWidth
					variant='filled'
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
				/>
				<Input
					{...register('password', {
						required: 'Это поле обязательно',
					})}
					placeholder='Пароль'
					type={!isViewPassword ? 'password' : 'text'}
					fullWidth
					variant='filled'
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
					{...register('email', {
						required: 'Это поле обязательно',
					})}
					placeholder='Email'
					fullWidth
					variant='filled'
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
				/>
				<Input
					{...register('name_map')}
					placeholder='Название карты'
					fullWidth
					variant='filled'
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
				/>
				<TextArea
					{...register('description_map')}
					placeholder='Описание карты'
					variant='filled'
					fullWidth
					className='bg-white h-28 text-[1rem] xl:text-lg'
				/>
				<Button
					variant='green'
					className='mt-3.5 min-h-8 xl:min-h-10 '
					disabled={isDisabled}
				>
					Зарегистрироваться
				</Button>
				<DescriptionSignUp />
				{isError && <p className='text-text-red mt-2'>{error.message}</p>}
			</form>

			<Popup open={isOpen} onClose={handleClosePopup}>
				<div className='flex flex-col gap-3 max-w-lg'>
					<h3
						className={`${successRegistration ? 'text-primary' : 'text-text-red'}`}
					>
						{successRegistration
							? 'Регистрация прошла успешно!'
							: 'Регистрация не прошла'}
					</h3>
					<p>{data?.message}</p>
					<Button onClick={handleClosePopup}>Хорошо</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Идет регистрация...' />
		</>
	);
};
