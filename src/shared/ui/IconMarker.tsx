import { FC } from 'react';

import { IPlace } from '@/entities/place/types';

interface IProps {
	mark: IPlace;
	size: [number, number];
	target?: boolean;
}

const IconMarker: FC<IProps> = ({ mark, size, target }) => {
	const color = target
		? `${mark.color ? mark.color : ''}`
		: `#${mark.color ? mark.color : ''}`;
	return (
		<svg
			style={{
				width: `${size[0]}px`,
				height: `${size[1]}px`,
				color: color,
			}}
		>
			<use xlinkHref={`/images/icons/sprite.svg#${mark.icon}`}></use>
		</svg>
	);
};

export default IconMarker;
