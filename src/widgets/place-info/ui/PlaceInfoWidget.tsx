'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useState } from 'react';

import { useCheckToken } from '@/app/providers/TokenProvider';
import { PlaceFormProvider } from '@/entities/place';
import { useGetDetailsPlace } from '@/entities/place/hooks/useGetDetailsPlace';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { AreaDetails, NewPlaceDetails } from '@/features/create-place';
import { ButtonsCreate } from '@/features/create-place/ui/ButtonsCreate';
import { ButtonsEdit, EditPlaceDetails } from '@/features/edit-place';
import { PanelPlace } from '@/features/panel-place';
import { PlaceDetails } from '@/features/place-details';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader/Loader';
import OrganizationInAvailabilityZone from '@/widgets/availability-zone/ui/OrganizationInAvailabilityZone';

const DynamicLoaderPortal = dynamic(
	() => import('@/shared/ui/loader/LoaderPortal').then(mod => mod.LoaderPortal),
	{ ssr: false },
);

export const PlaceInfoWidget: FC = () => {
	const view = useViewBlocksStore(store => store.view);
	const closeView = useViewBlocksStore(store => store.closeView);
	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const clearId = useTargetPlaceIdStore(store => store.clearId);
	const [
		viewOrganizationInAvailabilityZone,
		setViewOrganizationInAvailabilityZone,
	] = useState(false);

	const { isLoading, data } = useGetDetailsPlace(targetPlaceId);
	const { token } = useCheckToken();

	const handleReset = () => {
		closeView();
		clearId();
	};

	//HELP: Для того чтобы если пользователь просматривал объект, а потом решил создать, после создания закрыл окошко и открылось окно информации о предыдущем объекте, не было пустое окно без информацию. Проблема в том что при создании объекта удаляется id объекта который просматривался и когда нажимаешь назад, то открывается предыдущее окно, но id объекта нету который до этого просматривал и получается пустой компонент. Чтобы он не показывался, просто не выводим его.
	//TODO: подумать как "кэшировать" id объекта и чуть что потом убрать эту проверку и просто брать id из кэша. В качестве кэша можно использовать localStorage.
	if (view === 'place-info' && !targetPlaceId) return null;

	return (
		<div className='flex flex-col gap-2 min-h-0 flex-1'>
			{/* HELP: Провайдер работает для 2 фич: создание объекта и редактирование объекта. Ставим ключ для провайдера чтобы при смене режима, провайдер размонтировался и значения полей сбрасывались. Это нужно чтобы после просмотра или редактировании какого-то объекта, при создании новго объекта дефолтно все поля были пустыми, а не принимали значения от предыдущего объекта. */}
			<PlaceFormProvider key={view}>
				<div className='shadow-custom-black w-full sm:w-56 xl:w-sm rounded-xl py-3 px-2 xl:py-5 xl:px-4 flex flex-col gap-3 h-fit max-h-full min-h-0'>
					<div className='flex items-center justify-between shrink-0'>
						<h3 className='font-bold text-xl xl:text-[1.38rem]'>
							{view === 'area-info'
								? 'Информация по точке'
								: view === 'place-info'
									? 'Просмотр объекта'
									: view === 'create-place'
										? 'Добавление объекта'
										: 'Ошибка'}
						</h3>
						<Button variant='icon' className='w-auto!' onClick={handleReset}>
							<Image
								src={'/images/icons/exit.svg'}
								alt='exit'
								width={16} //HELP: минимальный размер для оптимизации
								height={16} //HELP: должен быть в тех же пропорциях, что и изображение
							/>
						</Button>
					</div>
					{view !== 'create-place' && (
						<PanelPlace
							setViewOrganizationInAvailabilityZone={
								setViewOrganizationInAvailabilityZone
							}
						/>
					)}
					{viewOrganizationInAvailabilityZone && (
						<OrganizationInAvailabilityZone
							setViewOrganizationInAvailabilityZone={
								setViewOrganizationInAvailabilityZone
							}
						/>
					)}
					{view !== 'place-info' ? null : token ? (
						<EditPlaceDetails />
					) : (
						<PlaceDetails />
					)}
					{view === 'area-info' && <AreaDetails />}
					{view === 'create-place' && <NewPlaceDetails />}
					{isLoading && <Loader />}
				</div>
				{view !== 'place-info'
					? null
					: token && <ButtonsEdit place={data} targetPlaceId={targetPlaceId} />}
				{view !== 'create-place'
					? null
					: token && <ButtonsCreate place={data} />}
			</PlaceFormProvider>
			<DynamicLoaderPortal isLoading={isLoading} message='Получаем данные...' />
		</div>
	);
};
