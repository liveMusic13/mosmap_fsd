'use client';

import { FC, useLayoutEffect } from 'react';

import WrapperFilters from '@/features/filters-map/ui/WrapperFilters';
import {
	useViewBlocksStore,
	useViewListsStore,
} from '@/shared/store/panelOptions.store';

const WrapperFilterContainer: FC = () => {
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

	return (
		<div className='overflow-hidden'>
			{view === 'filters' && <WrapperFilters />}
		</div>
	);
};

export default WrapperFilterContainer;
