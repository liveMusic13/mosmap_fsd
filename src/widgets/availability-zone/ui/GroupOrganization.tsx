import Image from 'next/image';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';

import { IGroupOrganization } from '../types';

import { useTargetPlaceIdStore } from '@/entities/place';
import { useAvailabilityZoneStore } from '@/entities/place/store/availabilityZone';
import { Checkbox } from '@/shared/ui/checkbox';

interface IProps {
	orgGroup: IGroupOrganization;
}

const titleTable = ['Название', 'Расстояние (м)'];

const GroupOrganization: FC<IProps> = ({ orgGroup }) => {
	const [isOpen, setIsOpen] = useState(false);
	const targetId = useTargetPlaceIdStore(store => store.id);

	const {
		idAvailabilityZone,
		setAllIdAvailabilityZone,
		setIdAvailabilityZone,
		setIdAvailabilityZoneNoToggle,
		addIdAvailabilityZone,
		removeIdAvailabilityZone,
	} = useAvailabilityZoneStore();

	useEffect(() => {
		setAllIdAvailabilityZone([]);
		setIsOpen(false);
	}, [targetId]);

	// useEffect(
	// 	() => console.log('idAvailabilityZone', idAvailabilityZone),
	// 	[idAvailabilityZone],
	// );

	useEffect(() => {
		if (isOpen) {
			addIdAvailabilityZone(Number(orgGroup.group_id));
		} else {
			removeIdAvailabilityZone(Number(orgGroup.group_id));
		}
	}, [isOpen]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsOpen(e.target.checked);
		// setIdAvailabilityZone(Number(orgGroup.group_id));
	};
	const handleOpen = () =>
		setIsOpen(p => {
			return !p;
		});

	return (
		<div>
			<div className='flex items-center gap-0.5 justify-between border-b border-dotted border-b-text-disabled p-0.5'>
				<Checkbox
					label={orgGroup.group_name}
					checked={isOpen}
					onChange={onChange}
				/>
				<Image
					src={'/images/icons/arrow_viewObject_mobile.svg'}
					alt='arrow'
					width={14}
					height={14}
					className={`${isOpen ? '' : ' -rotate-90 '} cursor-pointer `}
					onClick={handleOpen}
				/>
				<span>{orgGroup.count}</span>
			</div>
			{isOpen && (
				<div className='bg-light-blue border border-border-gray rounded-lg grid grid-cols-[2fr_0.5fr]'>
					{titleTable.map(title => (
						<h4
							key={title}
							className='font-bold border border-border-gray flex items-center justify-center'
						>
							{title}
						</h4>
					))}
					{orgGroup.org.map((org, i) => (
						<Fragment key={i}>
							<p className='py-1 border border-border-gray flex items-center justify-center'>
								{org.name}
							</p>
							<p className='py-1 border border-border-gray flex items-center justify-center'>
								{org.distance}
							</p>
						</Fragment>
					))}
				</div>
			)}
		</div>
	);
};

export default GroupOrganization;
