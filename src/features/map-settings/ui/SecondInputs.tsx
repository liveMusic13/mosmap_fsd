import { FC, memo } from 'react';

import { IFormSettingsMap } from '../hooks/useInitialData';

import WrapperMapSettings from './WrapperMapSettings';
import { namingSettingsMap } from '@/entities/map/lib/namingSettings';
import { Input } from '@/shared/ui/fields';

interface IProps {
	form: IFormSettingsMap;
	handleInputChange: (name: string, value: string) => void;
}

const SecondInputs: FC<IProps> = ({ form, handleInputChange }) => {
	return (
		<>
			<WrapperMapSettings caption={namingSettingsMap.RADIUS}>
				<div className='bg-white'>
					<Input
						value={form.inputs[namingSettingsMap.RADIUS] ?? ''}
						fullWidth
						onChange={e =>
							handleInputChange(namingSettingsMap.RADIUS, e.target.value)
						}
					/>
				</div>
			</WrapperMapSettings>
			<WrapperMapSettings caption={namingSettingsMap.URL_MAP}>
				<div className='bg-white'>
					<Input
						value={form.inputs[namingSettingsMap.URL_MAP] ?? ''}
						fullWidth
						onChange={e =>
							handleInputChange(namingSettingsMap.URL_MAP, e.target.value)
						}
					/>
				</div>
			</WrapperMapSettings>
		</>
	);
};

export default memo(SecondInputs);
