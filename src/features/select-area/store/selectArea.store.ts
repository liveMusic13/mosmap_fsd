import { create } from 'zustand';

import { ISelectAreaLayersStore, ISelectAreaStore } from '../types';

export const useSelectAreaStore = create<ISelectAreaStore>(set => ({
	isSelectArea: false,
	toggleSelectArea: () =>
		set(state => ({ ...state, isSelectArea: !state.isSelectArea })),
	idsSelectArea: [],
	toggleIdSelectArea: (id: number) =>
		set(state => ({
			idsSelectArea: state.idsSelectArea.includes(id)
				? state.idsSelectArea.filter(existingId => existingId !== id)
				: [...state.idsSelectArea, id],
		})),
	setIdSelectArea: (id: number) =>
		set(state => ({
			idsSelectArea: state.idsSelectArea.includes(id)
				? [...state.idsSelectArea]
				: [...state.idsSelectArea, id],
		})),
	setAllIdsSelectArea: (ids: number[]) => set({ idsSelectArea: ids }),
}));

export const useSelectAreaLayersStore = create<ISelectAreaLayersStore>(set => ({
	indexTargetPolygon: null,
	arrayPolygons: [],
	clearPolygon: () => set({ arrayPolygons: [] }),
	setIndexTargetPolygon: id =>
		set(state => {
			const index = state.arrayPolygons.findIndex(pol => pol.id === id);
			if (index !== -1) {
				return { indexTargetPolygon: index };
			} else {
				return { indexTargetPolygon: state.indexTargetPolygon };
			}
		}),
	deletePolygon: id =>
		set(state => ({
			arrayPolygons: state.arrayPolygons.filter(polygon => polygon.id !== id),
		})),
	addPolygon: pol =>
		set(state => ({ arrayPolygons: [...state.arrayPolygons, pol] })),
}));
