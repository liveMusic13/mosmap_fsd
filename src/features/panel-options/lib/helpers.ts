import { IPanelData } from '../types';

import { TViewBlocks } from '@/shared/types/store.types';

export const toggleActiveIcon = (
	but: IPanelData,
	view: TViewBlocks,
	viewList: boolean = true,
) => {
	if (but.id === 2 && view === 'filters') {
		return but.src ?? but.src_active;
	} else if (but.id === 2 && view !== 'filters') {
		return but.src_active;
	} else if (but.id === 3 && viewList) {
		return but.src ?? but.src_active;
	} else if (but.id === 3 && !viewList) {
		return but.src_active;
	}

	return but.src_active;
};
