import { useEffect, useState } from 'react';

import { useGetSettingsMap } from '@/entities/map/hooks/useGetSettingsMap';

export const useGetSizeMarker = () => {
	const [size, setSize] = useState<[number, number]>([22, 22]);
	const { data, isSuccess } = useGetSettingsMap();

	useEffect(() => {
		if (isSuccess && data) {
			const sizeData = data.iconsize;
			const arrSize: [number, number] = [
				Number(sizeData || 22),
				Number(sizeData || 22),
			];
			setSize(arrSize);
		}
	}, [data, isSuccess]);

	return size;
};
