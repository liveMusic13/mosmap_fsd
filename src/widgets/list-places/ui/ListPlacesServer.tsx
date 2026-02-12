import { FC } from 'react';

import { IPlace } from '@/entities/place/types';

interface IProps {
	places: IPlace[];
}

const ListPlacesServer: FC<IProps> = ({ places }) => {
	return (
		<ul>
			{places.map(p => (
				<li key={p.id}>{p.name}</li>
			))}
		</ul>
	);
};

export default ListPlacesServer;
