import { FC, memo } from 'react';

import { IFormSettingsMap } from '../hooks/useInitialData';

import WrapperMapSettings from './WrapperMapSettings';
import { namingSettingsMap } from '@/entities/map/lib/namingSettings';
import { Input } from '@/shared/ui/fields';

interface IProps {
	form: IFormSettingsMap;
	handleInputChange: (name: string, value: string) => void;
}

const FirstInputs: FC<IProps> = ({ form, handleInputChange }) => {
	return (
		<>
			<WrapperMapSettings caption={namingSettingsMap.TITLE}>
				<div className='bg-white'>
					<Input
						value={form.inputs[namingSettingsMap.TITLE] ?? ''}
						fullWidth
						onChange={e =>
							handleInputChange(namingSettingsMap.TITLE, e.target.value)
						}
					/>
				</div>
			</WrapperMapSettings>

			<WrapperMapSettings caption={namingSettingsMap.DESCRIPTION}>
				<div className='bg-white'>
					<Input
						value={form.inputs[namingSettingsMap.DESCRIPTION] ?? ''}
						fullWidth
						onChange={e =>
							handleInputChange(namingSettingsMap.DESCRIPTION, e.target.value)
						}
					/>
				</div>
			</WrapperMapSettings>

			<WrapperMapSettings caption={namingSettingsMap.SIZES_ICONS}>
				<div className='bg-white'>
					<Input
						value={form.inputs[namingSettingsMap.SIZES_ICONS] ?? ''}
						fullWidth
						onChange={e =>
							handleInputChange(namingSettingsMap.SIZES_ICONS, e.target.value)
						}
					/>
				</div>
			</WrapperMapSettings>
		</>
	);
};

export default memo(FirstInputs);
