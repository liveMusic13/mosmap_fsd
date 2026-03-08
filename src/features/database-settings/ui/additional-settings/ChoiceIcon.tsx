import { FC } from 'react';

import { useGetIcons } from '../../hooks/useGetIcons';

import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader';

interface IProps {
	map: string;
	handleCloseIcons: () => void;
	handleIcon: (name: string) => void;
}

const ChoiceIcon: FC<IProps> = ({ map, handleCloseIcons, handleIcon }) => {
	const { data, isLoading } = useGetIcons(map);

	return (
		<div className='top-[115%] -left-2/3 z-55 absolute bg-white rounded-lg w-58 shadow-custom-black p-2'>
			{isLoading && <Loader />}
			<div className='flex flex-wrap items-center gap-2 mb-3'>
				{data?.map((icon, ind) => (
					<svg
						key={ind}
						className=' text-gray-400 w-7 h-7 cursor-pointer'
						onClick={() => handleIcon(icon)}
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
