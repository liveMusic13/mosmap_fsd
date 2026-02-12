import { IPlace } from '@/entities/place/types';

export type TUrl = 'query' | 'seo';

//TODO: Пока оставляю тут типизацию кнопки хедера для перехода по ссылке
export interface ILinkButtonInMapPageData {
	image_full: string;
	image_min: string;
	text: string;
	url: string;
}

export interface IMapPageData {
	['all-points']: number;
	bounds: string;
	buttons: ILinkButtonInMapPageData[];
	canvas_map: string;
	clastering: string;
	color_ref: string;
	colors: Record<string, string>;
	description: string;
	icons_size: Record<string, [number, number]>;
	icons: Record<string, string>;
	icons_ref: string;
	map: number;
	points: IPlace[];
	tiles_url: string;
	title: string;
	url: string;
	zoom_max: number;
	zoom_min: number;
}
