import { useQuery } from '@tanstack/react-query';

import { getSettingsMap } from '../api/settingsMap';

export const useGetSettingsMap = () => {
	return useQuery({
		queryKey: ['settings-map'],
		queryFn: getSettingsMap,
	});
};
