'use client';

import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';

import { useInitialData } from '../hooks/useInitialData';

import Checboxes from './Checboxes';
import FirstInputs from './FirstInputs';
import MovePassword from './MovePassword';
import SecondInputs from './SecondInputs';
import { useSaveSettingsMap } from '@/entities/map/hooks/useSaveSettingsMap';
import { namingSettingsMap } from '@/entities/map/lib/namingSettings';
import { useBeforeLeave } from '@/shared/hooks/useBeforeLeave';
import { useGetMapForOtherPage } from '@/shared/hooks/useGetMapForOtherPage';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import Select from '@/shared/ui/Select';
import { LoaderPortal } from '@/shared/ui/loader';

const MapSettings: FC = () => {
	const router = useRouter();
	const [isDirty, setIsDirty] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false); //HELP: Добавляем этот флаг для того чтобы контролировать сохранение через кнопку "сохранить". без него по нажатию на эту кнопку не будет переадресовывать на главную страницу
	const [isOpen, setIsOpen] = useState(false);
	const [confirmExit, setConfirmExit] = useState(false);

	const map = useGetMapForOtherPage();
	const { data, isSuccess, form, setForm, optionsSelect, initialForm } =
		useInitialData();

	useBeforeLeave(isDirty && !isNavigating, () => {
		setConfirmExit(true);
	});
	const {
		mutate,
		data: data_save,
		isPending,
		isSuccess: isSuccess_save,
	} = useSaveSettingsMap();

	useEffect(() => {
		if (isSuccess_save) {
			if (data_save.save_status !== 'OK') {
				setIsOpen(true);
				setIsNavigating(false);
			}
		}
	}, [isSuccess_save, data_save]);

	useEffect(() => {
		setIsDirty(JSON.stringify(form) !== JSON.stringify(initialForm));
	}, [form, initialForm]);

	const handleInputChange = useCallback((name: string, value: string) => {
		setForm(prev => ({
			...prev,
			inputs: {
				...prev.inputs,
				[name]: value,
			},
		}));
	}, []);
	const handleCheckboxChange = useCallback((name: string, value: boolean) => {
		setForm(prev => ({
			...prev,
			checkboxes: {
				...prev.checkboxes,
				[name]: value,
			},
		}));
	}, []);
	const handleSelectChange = useCallback(
		(name: string, value: number) => {
			const newObj = optionsSelect.find(opt => opt.value === value);
			const newObjStringValue = {
				name: newObj?.name,
				id: String(newObj?.value),
			};

			setForm(prev => ({
				...prev,
				selects: {
					...prev.selects,
					[name]: newObj ? newObjStringValue : prev.selects[name],
				},
			}));
		},
		[optionsSelect],
	);
	const handleClose = () => setIsOpen(false);
	const handleSaveSettings = () => {
		setIsNavigating(true);
		const saveSettingsObject = {
			tiles_list: data?.tiles_list ?? [],
			clastering: form.checkboxes[namingSettingsMap.CLASTERING] ? '1' : '0',
			autosize: form.checkboxes[namingSettingsMap.AUTOSIZE_ICONS] ? '1' : '0',
			showhouses: form.checkboxes[namingSettingsMap.CONTOURS_HOME] ? '1' : '0',
			showanalytic: form.checkboxes[namingSettingsMap.ANALYSIS_AREA]
				? '1'
				: '0',
			title: form.inputs[namingSettingsMap.TITLE],
			descr: form.inputs[namingSettingsMap.DESCRIPTION],
			iconsize: form.inputs[namingSettingsMap.SIZES_ICONS],
			radius: form.inputs[namingSettingsMap.RADIUS],
			tiles_id: form.inputs[namingSettingsMap.TILES_ID],
			url: form.inputs[namingSettingsMap.URL_MAP],
			map_id: map,
		};

		mutate(saveSettingsObject);
	};

	return (
		<>
			<div className='flex flex-col gap-4 sm:gap-2 rounded-lg bg-light-blue min-h-0 max-h-full p-4 overflow-y-auto scrollbar-custom'>
				{isSuccess && (
					<>
						<FirstInputs form={form} handleInputChange={handleInputChange} />
						<Checboxes
							form={form}
							handleCheckboxChange={handleCheckboxChange}
						/>
						<SecondInputs form={form} handleInputChange={handleInputChange} />
						<MovePassword />
						<Select
							options={optionsSelect}
							value={Number(form.selects[namingSettingsMap.VIEW_MAP]?.id)}
							onChange={num =>
								handleSelectChange(namingSettingsMap.VIEW_MAP, num)
							}
						/>
						<Button className='min-h-8' onClick={handleSaveSettings}>
							Сохранить
						</Button>
					</>
				)}
			</div>
			<Popup open={confirmExit} onClose={() => setConfirmExit(false)}>
				<div className='flex flex-col gap-3'>
					<p>Есть несохраненные изменения. Сохранить?</p>

					<div className='flex gap-2'>
						<Button
							onClick={() => {
								handleSaveSettings();
								setIsDirty(false);
							}}
						>
							Сохранить
						</Button>

						<Button
							onClick={() => {
								setConfirmExit(false);
								setIsDirty(false);
								router.back();
							}}
						>
							Выйти без сохранения
						</Button>
					</div>
				</div>
			</Popup>
			<Popup open={isOpen} onClose={handleClose}>
				<div>
					<p
						className={`${data_save?.save_status === 'OK' && 'text-text-red'} mb-3`}
					>
						{data_save?.save_status !== 'OK' && 'Ошибка сохранения!'}
					</p>
					<Button onClick={handleClose}>Закрыть</Button>
				</div>
			</Popup>
			<LoaderPortal isLoading={isPending} message='Идет смена пароля...' />
		</>
	);
};

export default MapSettings;
