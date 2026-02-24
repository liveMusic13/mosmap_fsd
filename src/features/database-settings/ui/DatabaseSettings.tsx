'use client';

import { FC, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { useFormTable } from '../hooks/useFormTable';
import { useGetAllFields } from '../hooks/useGetAllFields';

import Buttons from './Buttons';
import Table from './Table';

const DatabaseSettings: FC = () => {
	const { data } = useGetAllFields();

	const normalizedData = useMemo(() => {
		return (data ?? []).slice().sort((a, b) => a.priority - b.priority);
	}, [data]);

	const form = useFormTable(normalizedData);

	return (
		<FormProvider {...form.methods}>
			<form className='flex flex-col gap-1 rounded-lg bg-light-blue min-h-0 max-h-full '>
				<Table fields={form.fields} />
				<Buttons append={form.append} rowsCount={form.fields.length} />
			</form>
		</FormProvider>
	);
};

export default DatabaseSettings;
