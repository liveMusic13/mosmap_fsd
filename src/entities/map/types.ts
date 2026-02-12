export interface ICenterMapStore {
	centerMap: number[];
	setCenterMap: (crd: number[]) => void;
}

export interface IZoomLevelStore {
	zoomLevel: number;
	setZoomLevel: (num: number) => void;
}
