import { FC } from 'react';

import { ButtonPanel } from './ButtonPanel';
import { useViewSearchAddressStore } from '@/features/search-address/store/searchAddress.store';
import { useSelectAreaStore } from '@/features/select-area';

export const buttonsMap = [
	{
		id: 0,
		src_active: 'home-search-outline',
		hover_text: 'Поиск',
	},
	{
		id: 1,
		src_active: 'selection-drag',
		src: 'selection-remove',
		hover_text: 'Выделить область',
	},
];

export const PanelOptionsInMap: FC = () => {
	const toggleSelectArea = useSelectAreaStore(store => store.toggleSelectArea);
	const isSelectArea = useSelectAreaStore(store => store.isSelectArea);
	const toggleViewSearch = useViewSearchAddressStore(store => store.toggleView);
	const isViewSearch = useViewSearchAddressStore(store => store.isView);

	const onClick = (id: number) => {
		if (id === 0) {
			toggleViewSearch();
		} else if (id === 1) {
			toggleSelectArea();
		}
	};

	return (
		<div className='flex gap-2 absolute right-2.5 top-2.5 z-33'>
			{buttonsMap.map(but => {
				const src =
					but.id === 1
						? isSelectArea
							? but.src
							: but.src_active
						: but.src_active;

				const isRed =
					(but.id === 1 && isSelectArea) || (but.id === 0 && isViewSearch);

				return (
					<ButtonPanel
						key={but.id}
						hover_text={but.hover_text}
						onClick={() => onClick(but.id)}
						position='right'
						isRed={isRed}
						src={src as string}
					/>
				);
			})}
		</div>
	);
};
