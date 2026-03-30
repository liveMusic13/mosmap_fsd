import { useTargetPlaceIdStore } from '../store/targetPlace.store';

import { useViewBlocksStore } from '@/shared/store/panelOptions.store';

export const useClickPlaceInMap = () => {
	const setTargetId = useTargetPlaceIdStore(store => store.setTargetId);
	const openView = useViewBlocksStore(store => store.openView);

	const onClickPlace = (id: number) => {
		setTargetId(id);
		// setAllIdAvailabilityZone([]);
		openView('place-info');
	};

	return onClickPlace;
};
