'use client';

import { FC, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';

import { useFormTable } from '../hooks/useFormTable';
import { useGetAllFields } from '../hooks/useGetAllFields';

import Buttons from './Buttons';
import Table from './Table';
import { Loader } from '@/shared/ui/loader';

const DatabaseSettings: FC = () => {
	const { data, isLoading } = useGetAllFields();

	const normalizedData = useMemo(() => {
		return (data ?? []).slice().sort((a, b) => a.priority - b.priority);
	}, [data]);

	const form = useFormTable(normalizedData);

	return (
		<FormProvider {...form.methods}>
			<form
				className='flex flex-col gap-1 rounded-lg bg-light-blue min-h-0 max-h-full'
				onSubmit={form.methods.handleSubmit(form.onSubmit)}
			>
				{isLoading && <Loader />}
				<Table
					fields={form.fields}
					moveRow={form.moveRow}
					removeRow={form.removeRow}
					update={form.update}
				/>
				<Buttons append={form.append} rowsCount={form.fields.length} />
			</form>
		</FormProvider>
	);
};

export default DatabaseSettings;
