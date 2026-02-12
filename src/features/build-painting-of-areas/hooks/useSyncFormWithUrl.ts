import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { type Control, useWatch } from 'react-hook-form';

import type { IFormColorInterval } from '../types';

export const useSyncFormWithUrl = (control: Control<IFormColorInterval>) => {
	const pathname = usePathname();

	const values = useWatch({ control });

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		let changed = false;

		Object.entries(values).forEach(([key, value]) => {
			const stringValue = String(value ?? '');

			if (params.get(key) !== stringValue) {
				params.set(key, stringValue);
				changed = true;
			}
		});

		if (changed) {
			const newUrl = `${pathname}?${params.toString()}`;
			window.history.replaceState(null, '', newUrl);
		}
	}, [values, pathname]);
};
