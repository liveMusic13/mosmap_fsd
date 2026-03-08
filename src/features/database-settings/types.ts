export type TTypeObject = 0 | 1 | 5 | 6 | 7;

export interface IObjectOne {
	id: number;
	address: number;
	name: string;
	namefield: number;
	nameonmap: number;
	priority: number;
	type: TTypeObject;
	type_name: string;
}

export interface IObjectTwo {
	id: number;
	name: string;
	priority: number;
	type: TTypeObject;
	color: number;
	icon: number;
	mode: number;
}

export interface IObjectThree {
	id: number;
	name: string;
	priority: number;
	type: TTypeObject;
	mode: number;
	visible: number;
}

export interface IRowAdditional {
	color?: string;
	icon_name?: string;
	id: number;
	name: string;
}
