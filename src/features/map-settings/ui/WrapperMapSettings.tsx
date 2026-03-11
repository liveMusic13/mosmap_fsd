import { FC, ReactNode } from 'react';

export interface IWrapperMapSettingsProps {
	caption: string;
	children: ReactNode;
}

const WrapperMapSettings: FC<IWrapperMapSettingsProps> = ({
	caption,
	children,
}) => {
	return (
		<div>
			<h4 className='font-bold pb-1.5'>{caption}</h4>
			{children}
		</div>
	);
};

export default WrapperMapSettings;
