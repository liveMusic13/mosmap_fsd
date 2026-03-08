import { FC } from 'react';

import Button from '@/shared/ui/Button';

interface IProps {
	onOpen: () => void;
}

const ButtonSettings: FC<IProps> = ({ onOpen }) => {
	return (
		<Button type='button' variant='icon' onClick={onOpen}>
			<svg
				className='w-6 h-6 text-primary'
				// className={styles.icon_svg}
				// style={{ color: colors.green }}
				// onClick={() =>
				// 	// isActive ? handleViewSettings(el) : undefined
				// 	{
				// 		const test = editableData.find(element => {
				// 			if (el.name === 'Иконка') {
				// 				return element.icon === 1 ? element : 0;
				// 			} else if (el.name === 'Цвет') {
				// 				return element.color === 1 ? element : 0;
				// 			}
				// 		});
				// 		setTargetIdObject(test?.id);
				// 		handleViewSettings(el);
				// 	}
				// }
			>
				<use xlinkHref={`/images/icons/sprite.svg#gear`}></use>
			</svg>
		</Button>
	);
};

export default ButtonSettings;
