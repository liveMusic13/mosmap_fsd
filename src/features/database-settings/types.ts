export type TTypeObject = 0 | 1 | 5 | 6 | 7;

export interface IObjectOne {
	id: number;
	address: number;
	name: string;
	namefield: number;
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
