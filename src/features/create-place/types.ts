export interface IAreaDetails {
	href: string;
	name: string;
	value: string;
}

export interface ICreatePlaceStore {
	isCreate: boolean;
	setIsCreate: (bol: boolean) => void;
}
