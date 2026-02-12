export type TFilterType = 'map' | 'list' | 'number';

export interface IFilterItem {
	item_id: number;
	item_name: string;
}

export interface IFiltersData {
	caption: string;
	id: number;
	items?: IFilterItem[];
	multiple?: number;
	name: string;
	type: TFilterType;
	min_value?: string;
	max_value?: string;
}
