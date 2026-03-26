import { create } from 'zustand';

import {
	IViewBlocksStore,
	IViewListsStore,
	IViewPaintingOfAreaStore,
} from '../types/store.types';

export const useViewBlocksStore = create<IViewBlocksStore>(set => ({
	view: 'filters',
	prevView: null,
	isInitialized: false,
	initialize: () => {
		if (typeof window !== 'undefined') {
			set({
				view: window.innerWidth < 640 ? null : 'filters',
				isInitialized: true,
			});
		}
	},

	//HELP: открываем новый экран, запоминая текущий
	openView: newView =>
		set(state => ({
			prevView: state.view,
			view: newView,
		})),

	//HELP:закрываем блок и восстанавливаем предыдущий
	closeView: () =>
		set(state => ({
			view: state.prevView,
			prevView: null,
		})),

	//HELP:все закрываем
	fullCloseView: () =>
		set(state => ({
			view: null,
			prevView: null,
		})),
}));

export const useViewListsStore = create<IViewListsStore>(set => ({
	isView: true,
	setIsView: bol => set({ isView: bol }),

	isInitialized: false,
	initialize: () => {
		if (typeof window !== 'undefined') {
			set({
				isView: window.innerWidth < 640 ? false : true,
				isInitialized: true,
			});
		}
	},
}));

export const useViewPaintingOfAreaStore = create<IViewPaintingOfAreaStore>(
	set => ({
		isView: false,
		toggleView: () => set(state => ({ ...state, isView: !state.isView })),
		setIsView: bol => set({ isView: bol }),
	}),
);
