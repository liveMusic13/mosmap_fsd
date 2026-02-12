import { create } from 'zustand';

import { ICrdStore } from '@/shared/types/store.types';

export const useCrdAreaStore = create<ICrdStore>(set => ({
	crd: null,
	setCrd: crd => set({ crd }),
	clearCrd: () => set({ crd: null }),
}));
