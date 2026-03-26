// shared/store/colorMap.store.ts
import { create } from 'zustand';

interface IColorMapParamsState {
	mapParam: string;
	sloi: number;
	type: number;
	fieldId: number;
	setParams: (params: Omit<IColorMapParamsState, 'setParams'>) => void;
}

export const useColorMapParamsStore = create<IColorMapParamsState>(set => ({
	mapParam: '',
	sloi: 0,
	type: 0,
	fieldId: 0,
	setParams: params => set(params),
}));
