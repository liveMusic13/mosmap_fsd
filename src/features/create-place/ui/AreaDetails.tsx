'use client';
import { FC } from 'react';

import { useGetAreaInfo } from '../hooks/useGetAreaInfo';

import { AreaDetail } from './AreaDetail';
import { useCrdAreaStore } from '@/entities/place';
import { useViewBlocksStore } from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader/Loader';

export const AreaDetails: FC = () => {
	const crdArea = useCrdAreaStore(store => store.crd);
	const { data, isLoading, isSuccess } = useGetAreaInfo(crdArea);
	const openView = useViewBlocksStore(store => store.openView);

	const onCreate = () => openView('create-place');

	return (
		<div className='flex flex-col gap-2 min-h-0 flex-1 overflow-auto scrollbar-custom'>
			{isLoading && <Loader />}
			{isSuccess &&
				data.map((info, ind) => (
					<AreaDetail key={`${info.name}${ind}`} area={info} />
				))}
			<Button onClick={onCreate}>Добавить объект</Button>
		</div>
	);
};
