import { create } from 'zustand';

import { IAvailabilityZoneStore, IViewAvailabilityZoneStore } from '../types';

export const useViewAvailabilityZoneStore = create<IViewAvailabilityZoneStore>(
	(set, get) => ({
		isView: false,
		open: () => set({ isView: true }),
		close: () => set({ isView: false }),
		toggle: () => set({ isView: !get().isView }),
	}),
);

export const useAvailabilityZoneStore = create<IAvailabilityZoneStore>(set => ({
	organizationIdAvailabilityZone: '',
	idAvailabilityZone: [],
	setIdAvailabilityZone: id =>
		set(state => ({
			idAvailabilityZone: state.idAvailabilityZone.includes(id)
				? state.idAvailabilityZone.filter(existingId => existingId !== id)
				: [...state.idAvailabilityZone, id],
		})),
	setIdAvailabilityZoneNoToggle: id =>
		set(state => ({
			idAvailabilityZone: state.idAvailabilityZone.includes(id)
				? [...state.idAvailabilityZone]
				: [...state.idAvailabilityZone, id],
		})),
	setAllIdAvailabilityZone: ids => set({ idAvailabilityZone: ids }),
	setOrganizationIdAvailabilityZone: id =>
		set({ organizationIdAvailabilityZone: id }),
}));
