import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useRestore } from '../hooks/useRestore';

import { DescriptionRestore } from './DescriptionRestore';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

export interface IFormRestore {
	login: string;
	email: string;
}

export const Restore: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormRestore>({ mode: 'onChange' });

	const { email, login } = useWatch({ control });
	const isDisabled = !email || !login;

	const { mutate, data, isPending, isSuccess } = useRestore();

	useEffect(() => {
		if (isSuccess) setIsOpen(true);
	}, [isSuccess, data]);

	const handleClosePopup = () => setIsOpen(false);

	const onSubmit = (data: IFormRestore) => {
		mutate(data);
	};

	const restoreStatusOk = data?.status === 'OK';

	return (
		<>
			<form
				className='flex flex-col gap-2.5 w-full bg-light-blue border-2 border-light-blue mt-3.5 rounded-xl p-2 sm:p-9 overflow-y-auto
    max-h-full scrollbar-custom'
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
					placeholder='Почта'
					{...register('email', {
						required: 'Это поле обязательно',
					})}
					error={errors.email?.message}
					fullWidth
					className='bg-white h-16.5 text-[1rem] xl:text-lg'
				/>
				<Button disabled={isDisabled}>Восстановить</Button>

				<DescriptionRestore />
			</form>

			<Popup open={isOpen} onClose={handleClosePopup}>
				<div className='flex flex-col gap-3 max-w-lg'>
					<h3
						className={`${restoreStatusOk ? 'text-primary' : 'text-text-red'}`}
					>
						{restoreStatusOk ? 'Успешно!' : 'Ошибка'}
					</h3>
					<p>{data?.message}</p>
					<Button onClick={handleClosePopup}>Закрыть</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Поиск пользователя...' />
		</>
	);
};
