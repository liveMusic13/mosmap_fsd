import { colorIntervalSearchParams } from './constants';

export interface IIntervalRange {
	field_id: number;
	max_value: number;
	min_value: number;
	sloi: number;
	type: number;
}

export interface IModeList {
	field_visible: 0 | 1;
	interval_visible: 0 | 1;
	name: string;
	id: number;
}

export interface IFields {
	id: number;
	name: string;
}

export interface IColorInterval {
	// current_field: 0 | 1;
	// current_mode: 0 | 1;
	// current_sloi: 0 | 1;
	current_field: number;
	current_mode: number;
	current_sloi: number;
	intervals: IIntervalRange[];
	mode_list: IModeList[];
	num_fields: IFields[];
	sloi_fields: IFields[];
}

export interface IViewPaintingOfAreaStore {
	isView: boolean;
	toggleView: () => void;
}

export interface IFormColorInterval {
	[colorIntervalSearchParams.layerMap]: string;
	[colorIntervalSearchParams.coloringMethod]: string;
	[colorIntervalSearchParams.numberField]: string;
}

export type RangeItem = {
	min: number;
	max: number;
	color: string;
};

export type RangeFormValues = {
	ranges: RangeItem[];
};
