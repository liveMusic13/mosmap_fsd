import { FC } from 'react';
import { Control } from 'react-hook-form';

import { IFiltersData } from '../types';

import Filter from './Filter';
import { FormDataFilter } from './WrapperFilters';

interface IProps {
	filters: IFiltersData[];
	control: Control<FormDataFilter>;
}

const Filters: FC<IProps> = ({ filters, ...props }) => {
	if (!filters || filters.length === 0) return null;

	return (
		<div className='scrollbar-custom overflow-x-hidden overflow-y-auto flex-1 flex flex-col gap-2 xl:gap-5'>
			{filters.map(filter => (
				<Filter key={filter.id} filter={filter} {...props} />
			))}
		</div>
	);
};

export default Filters;
