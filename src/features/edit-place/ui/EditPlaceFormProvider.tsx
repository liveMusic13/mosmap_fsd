import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export const EditPlaceFormProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const methods = useForm({
		mode: 'onChange',
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
};
