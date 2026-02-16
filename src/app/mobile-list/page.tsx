import { cookies } from 'next/headers';

import { WrapperPanel } from '@/features/panel-options';
import { getMapPageData } from '@/shared/api/getMapPageData';
import { USER_MAP_SERVER_COOKIE } from '@/shared/constants';
import { buildQueryParams } from '@/shared/lib/url';
import WrapperListContainer from '@/widgets/map-with-list-and-filters/ui/WrapperListContainer';

export const dynamic = 'force-dynamic';

export default async function MobileFilters({
	searchParams,
}: {
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const cookieStore = cookies();
	const map = (await cookieStore).get(USER_MAP_SERVER_COOKIE)?.value || '';

	const queryParams = buildQueryParams('query', await searchParams, map);

	if (!map)
		return (
			<div className='flex items-center justify-center flex-1'>
				<p>Карта не выбрана</p>
			</div>
		);

	const response = await getMapPageData(queryParams);

	return (
		<div className='flex flex-col gap-3.5 min-h-0 flex-1 px-2.5 sm:px-5 md:px-7.5 xl:px-15 py-2.5 sm:py-5 lg:py-6 xl:py-10 overflow-x-hidden '>
			<h1 className='uppercase text-xl sm:text-4xl font-intro'>
				{response.title}
			</h1>
			<WrapperPanel />
			<WrapperListContainer places={response.points ?? []} />
		</div>
	);
	// return (
	// 	<div className='flex flex-col gap-3.5 min-h-0 flex-1 px-2.5 sm:px-5 md:px-7.5 xl:px-15 py-2.5 sm:py-5 lg:py-6 xl:py-10 overflow-hidden'>
	// 		<h1 className='uppercase text-xl sm:text-4xl font-intro shrink-0'>
	// 			{response.title}
	// 		</h1>
	// 		<div className='shrink-0'>
	// 			<WrapperPanel />
	// 		</div>
	// 		<div className='flex-1 min-h-0 overflow-hidden'>
	// 			<WrapperAllMapContainerMobile places={response.points ?? []} />
	// 		</div>
	// 	</div>
	// );
}
