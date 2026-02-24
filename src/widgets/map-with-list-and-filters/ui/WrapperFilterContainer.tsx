'use client';

import { useRouter } from 'next/navigation';
import { FC, useLayoutEffect } from 'react';

import WrapperFilters from '@/features/filters-map/ui/WrapperFilters';
import {
	useViewBlocksStore,
	useViewListsStore,
} from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';

const WrapperFilterContainer: FC = () => {
	const router = useRouter();
	const view = useViewBlocksStore(store => store.view);
	const fullCloseView = useViewBlocksStore(store => store.fullCloseView);
	const openView = useViewBlocksStore(store => store.openView);
	const setIsViewList = useViewListsStore(store => store.setIsView);

	useLayoutEffect(() => {
		setIsViewList(false);
		openView('filters');

		return () => {
			setIsViewList(false);
			fullCloseView();
		};
	}, []);

	const handleBack = () => router.back();

	return (
		<div className='overflow-hidden'>
			<Button className='mb-3 w-auto!' onClick={handleBack}>
				Назад
			</Button>
			{view === 'filters' && <WrapperFilters />}
		</div>
	);
};

export default WrapperFilterContainer;
