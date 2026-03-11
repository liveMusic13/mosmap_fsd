import { FC, useEffect, useState } from 'react';

import { useMovePass } from '../hooks/useMovePass';

import WrapperMapSettings from './WrapperMapSettings';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Input } from '@/shared/ui/fields';
import { LoaderPortal } from '@/shared/ui/loader';

interface IPassForm {
	oldPass: string;
	newPass: string;
	repeatNewPass: string;
}

const MovePassword: FC = () => {
	const map = useGetMapForOtherPage();
	const [isOpen, setIsOpen] = useState(false);
	const [passwordForm, setPasswordForm] = useState<IPassForm>({
		oldPass: '',
		newPass: '',
		repeatNewPass: '',
	});

	const { mutate, data, isSuccess, isPending } = useMovePass();

	useEffect(() => {
		if (isSuccess) {
			if (data.status === 'OK') {
				setPasswordForm({ oldPass: '', newPass: '', repeatNewPass: '' });
			}
			setIsOpen(true);
		}
	}, [isSuccess, data]);

	const handleMovePass = () => {
		mutate({
			map,
			password: passwordForm.newPass,
			oldpassword: passwordForm.oldPass,
		});
	};
	const handleClose = () => setIsOpen(false);
	const handleChange = (field: 'old' | 'new' | 'newRep', value: string) => {
		if (field === 'old') {
			setPasswordForm(prev => ({ ...prev, oldPass: value }));
		} else if (field === 'new') {
			setPasswordForm(prev => ({ ...prev, newPass: value }));
		} else if (field === 'newRep') {
			setPasswordForm(prev => ({ ...prev, repeatNewPass: value }));
		}
	};

	const isIdenticalNewPass =
		passwordForm.newPass === passwordForm.repeatNewPass;
	const isDisabledButton =
		!passwordForm.oldPass ||
		!passwordForm.newPass ||
		!passwordForm.repeatNewPass ||
		!isIdenticalNewPass;

	return (
		<>
			<WrapperMapSettings caption={'Старый пароль:'}>
				<div className='bg-white'>
					<Input
						value={passwordForm.oldPass}
						fullWidth
						onChange={e => handleChange('old', e.target.value)}
					/>
				</div>
			</WrapperMapSettings>
			<WrapperMapSettings caption={'Новый пароль:'}>
				<div className='bg-white'>
					<Input
						value={passwordForm.newPass}
						fullWidth
						onChange={e => handleChange('new', e.target.value)}
					/>
				</div>
			</WrapperMapSettings>
			<WrapperMapSettings caption={'Подтверждение пароля:'}>
				<div className='bg-white'>
					<Input
						value={passwordForm.repeatNewPass}
						fullWidth
						onChange={e => handleChange('newRep', e.target.value)}
					/>
				</div>
			</WrapperMapSettings>
			<Button
				className='min-h-8'
				disabled={isDisabledButton}
				onClick={handleMovePass}
			>
				Сменить пароль
			</Button>
			<Popup open={isOpen} onClose={handleClose}>
				<div>
					<p
						className={`${data?.status === 'OK' ? 'text-primary' : 'text-text-red'} mb-3`}
					>
						{data?.status === 'OK' ? 'Пароль успешно изменен!' : data?.message}
					</p>
					<Button onClick={handleClose}>Закрыть</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Идет смена пароля...' />
		</>
	);
};

export default MovePassword;
