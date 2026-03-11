export interface ICenterMapStore {
	centerMap: number[];
	setCenterMap: (crd: number[]) => void;
}

export interface IZoomLevelStore {
	zoomLevel: number;
	setZoomLevel: (num: number) => void;
}

export interface IListMapSettings {
	name: string;
	id: string;
}

export interface ISettingsMap {
	autosize: string;
	clastering: string;
	descr: string;
	iconsize: string;
	radius: string;
	save_status: string;
	showanalytic: string;
	showhouses: string;
	tiles_id: string;
	tiles_list: IListMapSettings[];
	title: string;
	url: string;
}
