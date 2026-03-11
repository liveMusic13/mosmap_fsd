'use client';

import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { useFormTable } from '../hooks/useFormTable';
import { useGetAllFields } from '../hooks/useGetAllFields';

import Buttons from './Buttons';
import Table from './Table';
import { useBeforeLeave } from '@/shared/hooks/useBeforeLeave';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';
import { Loader, LoaderPortal } from '@/shared/ui/loader';

const DatabaseSettings: FC = () => {
	const router = useRouter();
	const [confirmExit, setConfirmExit] = useState(false);

	const { data, isLoading } = useGetAllFields();

	const normalizedData = useMemo(() => {
		return (data ?? []).slice().sort((a, b) => a.priority - b.priority);
	}, [data]);

	const form = useFormTable(normalizedData);

	useBeforeLeave(form.isDirty && !form.isNavigating, () =>
		setConfirmExit(true),
	);

	return (
		<FormProvider {...form.methods}>
			<form
				className='flex flex-col gap-1 rounded-lg sm:bg-light-blue min-h-0 max-h-full'
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
			<Popup open={confirmExit} onClose={() => setConfirmExit(false)}>
				<div className='flex flex-col gap-3'>
					<p>Есть несохраненные изменения. Сохранить?</p>
					<div className='flex gap-2'>
						<Button
							onClick={() => {
								form.methods.handleSubmit(form.onSubmit)();
								setConfirmExit(false);
							}}
						>
							Сохранить
						</Button>
						<Button
							onClick={() => {
								setConfirmExit(false);
								form.methods.reset();
								router.back();
							}}
						>
							Выйти без сохранения
						</Button>
					</div>
				</div>
			</Popup>
			<LoaderPortal
				isLoading={form.isPendingSave}
				message='Идет сохранение...'
			/>
		</FormProvider>
	);
};

export default DatabaseSettings;
