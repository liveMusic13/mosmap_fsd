import Image from 'next/image';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input, TextArea } from '@/shared/ui/fields';

//TODO: закончить регистрацию
export const SignUp: FC = () => {
	const [test, setTest] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({ mode: 'onChange' });

	const onSubmit = () => {};

	return (
		<form
			className='flex flex-col gap-2.5 bg-light-blue border-2 border-light-blue w-full mt-3.5 rounded-xl p-9 overflow-y-auto
    max-h-full scrollbar-custom'
		>
			<Input
				{...register('login', {
					required: '',
				})}
				placeholder='Логин'
				fullWidth
				variant='filled'
				className='bg-white h-16.5 text-[1rem] xl:text-lg'
			/>
			<Input
				placeholder='Пароль'
				type={!test ? 'password' : 'text'}
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
						onClick={() => setTest(p => !p)}
					/>
				}
			/>
			<Input
				placeholder='Email'
				fullWidth
				variant='filled'
				className='bg-white h-16.5 text-[1rem] xl:text-lg'
			/>
			<Input
				placeholder='Название карты'
				fullWidth
				variant='filled'
				className='bg-white h-16.5 text-[1rem] xl:text-lg'
			/>
			<TextArea
				placeholder='Описание карты'
				variant='filled'
				fullWidth
				className='bg-white h-28 text-[1rem] xl:text-lg'
			/>
		</form>
	);
};
