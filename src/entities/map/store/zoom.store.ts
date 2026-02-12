import { create } from 'zustand';

import { IZoomLevelStore } from '../types';

export const useZoomLevelStore = create<IZoomLevelStore>(set => ({
	zoomLevel: 10,
	setZoomLevel: num => set({ zoomLevel: num }),
}));
