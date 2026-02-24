'use client';

import { useRouter } from 'next/navigation';
import { FC, Suspense, useLayoutEffect } from 'react';

import { IPlace } from '@/entities/place/types';
import {
	useViewBlocksStore,
	useViewListsStore,
} from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';
import ListPlaces from '@/widgets/list-places/ui/ListPlaces';
import ListPlacesServer from '@/widgets/list-places/ui/ListPlacesServer';

interface IProps {
	places: IPlace[];
}

const WrapperListContainer: FC<IProps> = ({ places }) => {
	const router = useRouter();
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

	const handleBack = () => router.back();

	return (
		<div className='overflow-hidden'>
			<Button className='mb-3 w-auto!' onClick={handleBack}>
				Назад
			</Button>
			{isViewLists && (
				<Suspense fallback={<ListPlacesServer places={places} />}>
					<ListPlaces />
				</Suspense>
			)}
		</div>
	);
};

export default WrapperListContainer;
