export interface IExportForm {
	separator: string;
	encoding: number;
	uploadfile: string;
	house_id: boolean;
	addCoordinate: boolean;
}

export interface IExportResponse {
	OK: boolean;
	filename: string;
}
