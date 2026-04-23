import { FC, useRef } from 'react';

import { useGetIcons } from '../../hooks/useGetIcons';
import { IRowAdditional } from '../../types';

import { useClickOutside } from '@/shared/hooks/useClickOutside';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader';

interface IProps {
	map: string;
	handleCloseIcons: () => void;
	handleIcon: (name: string) => void;
	handleChangeForm: (
		id: number,
		field: keyof IRowAdditional,
		value: string | number,
	) => void;
	id: number;
}

const ChoiceIcon: FC<IProps> = ({
	map,
	handleCloseIcons,
	handleIcon,
	handleChangeForm,
	id,
}) => {
	const ref = useRef(null);
	const { data, isLoading } = useGetIcons(map);

	useClickOutside(ref, handleCloseIcons);

	return (
		<div
			className='top-[115%] -left-2/3 z-55 absolute bg-white rounded-lg w-58 shadow-custom-black p-2'
			ref={ref}
		>
			{isLoading && <Loader />}
			<div className='flex flex-wrap items-center gap-2 mb-3'>
				{data?.map((icon, ind) => (
					<svg
						key={ind}
						className=' text-gray-400 w-7 h-7 cursor-pointer'
						onClick={() => {
							handleIcon(icon);
							handleChangeForm(id, 'icon_name', icon);
							handleCloseIcons();
						}}
					>
						<use xlinkHref={`/images/icons/sprite.svg#${icon}`}></use>
					</svg>
				))}
			</div>
			<Button type={'button'} onClick={handleCloseIcons}>
				Закрыть
			</Button>
		</div>
	);
};

export default ChoiceIcon;
