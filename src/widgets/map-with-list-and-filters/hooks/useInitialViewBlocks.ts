import { useEffect } from 'react';

import {
	useViewBlocksStore,
	useViewListsStore,
} from '@/shared/store/panelOptions.store';

export const useInitialViewBlocks = (isClearMap: boolean | undefined) => {
	useEffect(() => {
		useViewBlocksStore.getState().initialize();
	}, []);
	useEffect(() => {
		useViewListsStore.getState().initialize();
	}, []);

	useEffect(() => {
		if (isClearMap) useViewListsStore.getState().setIsView(false);
	}, [isClearMap]);

	useEffect(() => {
		if (isClearMap) {
			useViewBlocksStore.getState().fullCloseView();
		}
	}, [isClearMap]);
};
