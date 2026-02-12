import { FC } from 'react';

import { ISearchAddress } from '../types';

interface IProps {
	list: ISearchAddress[];
	handleSearch: (name: string) => void;
}

export const ListSearch: FC<IProps> = ({ list, handleSearch }) => {
	if (list.length === 0) return null;

	return (
		<ul className='absolute left-0 top-[110%] rounded-lg max-h-64 min-h-0 scrollbar-custom bg-white overflow-auto'>
			{list.map(el => (
				<li
					key={el.id}
					className='py-1 px-2 border border-border-gray hover:text-primary cursor-pointer transition-colors'
					onClick={() => handleSearch(el.name)}
				>
					{el.name}
				</li>
			))}
		</ul>
	);
};
