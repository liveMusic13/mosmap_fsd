export interface IImportLoad {
	encoding: string;
	separator: string;
	uploadfile: string;
	file_field: string[];
	list_field: Record<number, string>;
	text_field: Record<number, string>;
}

export interface IImportLoadStore {
	encoding: string;
	separator: string;
	uploadfile: string;
	file_field: string[];
	list_field: Record<number, string>;
	text_field: Record<number, string>;
	addData: (data: IImportLoad) => void;
}

export interface IImportForm {
	separator: string;
	encoding: number;
	file: File | null;
}

interface IFixedFields {
	Идентификатор: number | undefined;
	Широта: number | undefined;
	Долгота: number | undefined;
	'ID дома mosmap': number | undefined;
	clear_id: boolean;
}

// Динамические поля — ключи это строки с числами
type TDynamicFields = Record<string, number | undefined>;

// Итоговый тип формы
export type TImportDoneForm = IFixedFields & TDynamicFields;
