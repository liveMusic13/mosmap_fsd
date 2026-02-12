export interface ICrdStore {
	crd: { lat: number; lng: number } | null;
	setCrd: (crd: { lat: number; lng: number }) => void;
	clearCrd: () => void;
}

export type TViewBlocks =
	| 'filters'
	| 'place-info'
	| 'area-info'
	| 'create-place'
	| null;

export interface IViewBlocksStore {
	view: TViewBlocks;
	prevView: TViewBlocks;
	openView: (newView: Exclude<TViewBlocks, null>) => void;
	closeView: () => void;
	fullCloseView: () => void;
}

export interface IViewListsStore {
	isView: boolean;
	setIsView: (bol: boolean) => void;
}

export interface IViewPaintingOfAreaStore {
	isView: boolean;
	toggleView: () => void;
}
