import { FC } from 'react';

import { IFormSettingsMap } from '../hooks/useInitialData';

import { namingSettingsMap } from '@/entities/map/lib/namingSettings';
import { Checkbox } from '@/shared/ui/checkbox';

interface IProps {
	form: IFormSettingsMap;
	handleCheckboxChange: (name: string, value: boolean) => void;
}

const Checboxes: FC<IProps> = ({ form, handleCheckboxChange }) => {
	return (
		<>
			<Checkbox
				checked={form.checkboxes[namingSettingsMap.AUTOSIZE_ICONS] || false}
				label={namingSettingsMap.AUTOSIZE_ICONS}
				onChange={e =>
					handleCheckboxChange(
						namingSettingsMap.AUTOSIZE_ICONS,
						e.target.checked,
					)
				}
			/>
			<Checkbox
				label={namingSettingsMap.CLASTERING}
				checked={form.checkboxes[namingSettingsMap.CLASTERING] || false}
				onChange={e =>
					handleCheckboxChange(namingSettingsMap.CLASTERING, e.target.checked)
				}
			/>
			<Checkbox
				label={namingSettingsMap.CONTOURS_HOME}
				checked={form.checkboxes[namingSettingsMap.CONTOURS_HOME] || false}
				onChange={e =>
					handleCheckboxChange(
						namingSettingsMap.CONTOURS_HOME,
						e.target.checked,
					)
				}
			/>
			<Checkbox
				label={namingSettingsMap.ANALYSIS_AREA}
				checked={form.checkboxes[namingSettingsMap.ANALYSIS_AREA] || false}
				onChange={e =>
					handleCheckboxChange(
						namingSettingsMap.ANALYSIS_AREA,
						e.target.checked,
					)
				}
			/>
		</>
	);
};

export default Checboxes;
