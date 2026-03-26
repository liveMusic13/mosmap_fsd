'use client';

import { useRouter } from 'next/navigation';
import { FC, useLayoutEffect } from 'react';

import { WrapperPaintingOfAreas } from '@/features/build-painting-of-areas';
import {
	useViewBlocksStore,
	useViewPaintingOfAreaStore,
} from '@/shared/store/panelOptions.store';
import Button from '@/shared/ui/Button';

const WrapperPaintingOfAreasContainer: FC = () => {
	const router = useRouter();
	const isViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.isView,
	);
	const setIsViewPaintingOfArea = useViewPaintingOfAreaStore(
		store => store.setIsView,
	);
	const fullCloseView = useViewBlocksStore(store => store.fullCloseView);

	useLayoutEffect(() => {
		fullCloseView();
		setIsViewPaintingOfArea(true);

		return () => {
			// setIsViewPaintingOfArea(false);
			fullCloseView();
		};
	}, []);

	const handleBack = () => router.back();

	return (
		<div className='overflow-hidden min-h-0 flex-1 flex flex-col'>
			<Button className='mb-3 w-auto! max-w-30' onClick={handleBack}>
				Назад
			</Button>
			{isViewPaintingOfArea && <WrapperPaintingOfAreas />}
		</div>
	);
};

export default WrapperPaintingOfAreasContainer;
