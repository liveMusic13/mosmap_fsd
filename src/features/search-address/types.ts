export interface ISearchAddress {
	id: string;
	name: string;
	coords: number[];
}

export interface IViewSearchAddressStore {
	isView: boolean;
	toggleView: () => void;
}
