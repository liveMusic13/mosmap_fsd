import { create } from 'zustand';

import { IMoveMarkerStore } from '../types';

export const useMoveMarkerStore = create<IMoveMarkerStore>(set => ({
	crd: null,
	setCrd: crd => set({ crd }),
	clearCrd: () => set({ crd: null }),
	isMove: false,
	setMove: bol => set({ isMove: bol }),
}));
