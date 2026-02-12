import { create } from 'zustand';

import { IViewSearchAddressStore } from '../types';

export const useViewSearchAddressStore = create<IViewSearchAddressStore>(
	set => ({
		isView: false,
		toggleView: () => set(state => ({ ...state, isView: !state.isView })),
	}),
);
