import { useEffect, useState } from 'react';

import { useGetSettingsMap } from '@/entities/map/hooks/useGetSettingsMap';
import { namingSettingsMap } from '@/entities/map/lib/namingSettings';

export interface IFormSettingsMap {
	inputs: Record<string, string>;
	checkboxes: Record<string, boolean>;
	selects: Record<string, any>;
}

export const useInitialData = () => {
	const { data, isSuccess } = useGetSettingsMap();
	const [form, setForm] = useState<IFormSettingsMap>({
		inputs: {},
		checkboxes: {},
		selects: {},
	});

	const [initialForm, setInitialForm] = useState<IFormSettingsMap | null>(null);

	useEffect(() => {
		if (isSuccess) {
			const inputStates = {
				[namingSettingsMap.TITLE]: data.title,
				[namingSettingsMap.DESCRIPTION]: data.descr,
				[namingSettingsMap.SIZES_ICONS]: data.iconsize,
				[namingSettingsMap.RADIUS]: data.radius,
				[namingSettingsMap.TILES_ID]: data.tiles_id,
				[namingSettingsMap.URL_MAP]: data.url,
			};

			const checkboxStates = {
				[namingSettingsMap.CLASTERING]: data.clastering === '0' ? false : true,
				[namingSettingsMap.AUTOSIZE_ICONS]:
					data.autosize === '0' ? false : true,
				[namingSettingsMap.CONTOURS_HOME]:
					data.showhouses === '0' ? false : true,
				[namingSettingsMap.ANALYSIS_AREA]:
					data.showanalytic === '0' ? false : true,
			};

			const targetViewMap = data.tiles_list.find(
				tile => tile.id === data.tiles_id,
			);
			const selectStates = {
				[namingSettingsMap.VIEW_MAP]: targetViewMap || {
					name: 'Не выбрано',
					id: '-1',
				},
			};

			const newForm = {
				inputs: inputStates,
				checkboxes: checkboxStates,
				selects: selectStates,
			};

			setForm(newForm);
			setInitialForm(newForm);
		}
	}, [isSuccess, data]);

	const optionsSelect =
		data?.tiles_list.map(opt => ({
			name: opt.name,
			value: Number(opt.id),
		})) || [];

	return { data, isSuccess, form, setForm, optionsSelect, initialForm };
};
