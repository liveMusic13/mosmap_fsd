import { create } from 'zustand';

import { ICenterMapStore } from '../types';

import { CENTER_MAP_CRD } from '@/shared/constants';

export const useCenterMapStore = create<ICenterMapStore>(set => ({
	centerMap: CENTER_MAP_CRD,
	setCenterMap: crd => set({ centerMap: crd }),
}));
