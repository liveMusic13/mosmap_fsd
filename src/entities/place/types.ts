export interface IPlace {
	color: string;
	crd: number[];
	icon: string;
	id: number;
	name: string | number;
	polygon: number[][];
	raion_id: string;
}

export interface ITargetPlaceIdStore {
	id: number | null;
	setTargetId: (id: number) => void;
	clearId: () => void;
}

export type TTypePlaceInfo = 'text' | 'number';
export type TElPlaceInfo = 'input' | 'select';
export type TDisabledPlace = 1 | 0;

export interface IValuesDetailsPlaceInfo {
	disabled: TDisabledPlace;
	el: TElPlaceInfo;
	label: string;
	name: string;
	priority: number;
	type: TTypePlaceInfo;
	value: string;
	id: string;
}

export interface IDetailsPlaceInfo extends IPlace {
	area: number[][] | number[];
	cuts: [];
	name_map: null;
	values: IValuesDetailsPlaceInfo[];
}

export interface IPlaceDetail {
	title: string;
	value: string;
}

export interface IMoveMarkerStore {
	isMove: boolean;
	setMove: (bol: boolean) => void;
	crd: number[] | null;
	setCrd: (crd: number[]) => void;
	clearCrd: () => void;
}
