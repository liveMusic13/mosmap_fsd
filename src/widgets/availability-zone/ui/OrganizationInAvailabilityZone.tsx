import Image from 'next/image';
import { Dispatch, FC, SetStateAction } from 'react';

import { useGetAvailabilityZone } from '../hooks/useGetAvailabilityZone';

import GroupOrganization from './GroupOrganization';
import { useCrdAreaStore, useTargetPlaceIdStore } from '@/entities/place';
import Button from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/loader';

interface IProps {
	setViewOrganizationInAvailabilityZone: Dispatch<SetStateAction<boolean>>;
}

const OrganizationInAvailabilityZone: FC<IProps> = ({
	setViewOrganizationInAvailabilityZone,
}) => {
	const idTargetPlace = useTargetPlaceIdStore(store => store.id);
	const crdArea = useCrdAreaStore(store => store.crd);
	const { data, isSuccess, isLoading } = useGetAvailabilityZone({
		id: idTargetPlace,
		lat: crdArea?.lat,
		lng: crdArea?.lng,
	});

	const handleClose = () => setViewOrganizationInAvailabilityZone(false);

	return (
		<div className='max-h-1/3 min-h-0 flex flex-col gap-1 border border-dotted border-t-0 border-text-disabled'>
			<div className='flex gap-0.5 items-center justify-between'>
				<h2 className='font-bold '>Организации рядом</h2>
				<Button
					variant='icon'
					className='flex gap-1 items-center w-fit!'
					onClick={handleClose}
				>
					<Image
						src={'/images/icons/exit.svg'}
						alt='exit'
						width={16} //HELP: минимальный размер для оптимизации
						height={16} //HELP: должен быть в тех же пропорциях, что и изображение
					/>
				</Button>
			</div>
			<div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar-custom'>
				{isLoading && <Loader />}
				{isSuccess &&
					data.orgs.map(orgGroup => (
						<GroupOrganization key={orgGroup.group_id} orgGroup={orgGroup} />
					))}
			</div>
		</div>
	);
};

export default OrganizationInAvailabilityZone;
