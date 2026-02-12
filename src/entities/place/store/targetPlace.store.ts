import { create } from 'zustand';

import { ITargetPlaceIdStore } from '../types';

export const useTargetPlaceIdStore = create<ITargetPlaceIdStore>(set => ({
	id: null,
	setTargetId: id => set({ id }),
	clearId: () => set({ id: null }),
}));
