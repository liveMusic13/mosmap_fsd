'use client';

import { FC, Suspense, useLayoutEffect } from 'react';

import { IPlace } from '@/entities/place/types';
import {
	useViewBlocksStore,
	useViewListsStore,
} from '@/shared/store/panelOptions.store';
import ListPlaces from '@/widgets/list-places/ui/ListPlaces';
import ListPlacesServer from '@/widgets/list-places/ui/ListPlacesServer';

interface IProps {
	places: IPlace[];
}

const WrapperListContainer: FC<IProps> = ({ places }) => {
	const isViewLists = useViewListsStore(store => store.isView);
	const fullCloseView = useViewBlocksStore(store => store.fullCloseView);
	const setIsViewList = useViewListsStore(store => store.setIsView);

	useLayoutEffect(() => {
		fullCloseView();
		setIsViewList(true);

		return () => {
			setIsViewList(false);
			fullCloseView();
		};
	}, []);

	return (
		<div className='overflow-hidden'>
			{isViewLists && (
				<Suspense fallback={<ListPlacesServer places={places} />}>
					<ListPlaces />
				</Suspense>
			)}
		</div>
	);
};

export default WrapperListContainer;
