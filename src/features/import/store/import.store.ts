import { create } from 'zustand';

import { IImportLoadStore } from '../types';

export const useImportLoadStore = create<IImportLoadStore>(set => ({
	encoding: '',
	separator: '',
	uploadfile: '',
	file_field: [],
	list_field: {},
	text_field: {},
	addData: data => set(data),
}));
