export interface ISelectAreaStore {
	isSelectArea: boolean;
	toggleSelectArea: () => void;
	idsSelectArea: number[];
	toggleIdSelectArea: (id: number) => void;
	setIdSelectArea: (id: number) => void;
	setAllIdsSelectArea: (id: number[]) => void;
}

export interface IPolygonForMapLayers {
	id: number;
	latLngs: {
		lat: number;
		lng: number;
	}[];
}

export interface ISelectAreaLayersStore {
	indexTargetPolygon: number | null;
	arrayPolygons: IPolygonForMapLayers[];
	setIndexTargetPolygon: (id: number | null) => void;
	addPolygon: (pol: IPolygonForMapLayers) => void;
	deletePolygon: (id: number) => void;
	clearPolygon: () => void;
}
