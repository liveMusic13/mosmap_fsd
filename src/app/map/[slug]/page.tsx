import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet/dist/leaflet.css';

import { WrapperPanel } from '@/features/panel-options';
import { getMapPageData } from '@/shared/api/getMapPageData';
import { buildQueryParams } from '@/shared/lib/url';
import WrapperAllMapContent from '@/widgets/map-with-list-and-filters/ui/WrapperAllMapContent';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const { slug } = await params;
	const queryParams = buildQueryParams('seo', await searchParams, slug);

	if (!slug)
		return {
			title: 'MosMap-Marker. Программное обеспечение для геоаналитики',
			description: 'MosMap-Marker. Программное обеспечение для геоаналитики',
		};

	const data = await getMapPageData(queryParams);

	//HELP: Возвращаем метаданные
	return {
		title:
			data.title || 'MosMap-Marker. Программное обеспечение для геоаналитики',
		description:
			data.description ||
			'MosMap-Marker. Программное обеспечение для геоаналитики',
	};
}

export default async function HomeSeo({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Record<string, string | string[] | undefined>;
}) {
	const { slug } = await params;
	const queryParams = buildQueryParams('seo', await searchParams, slug);

	const response = await getMapPageData(queryParams);

	return (
		<div className='flex flex-col gap-2  min-w-0 min-h-0 flex-1 px-2.5 sm:px-4 2xl:px-15 py-2.5 2xl:py-10'>
			<h1 className='uppercase text-xl sm:text-4xl font-intro line-clamp-2 sm:truncate'>
				{response.title}
			</h1>
			<WrapperPanel buttons={response.buttons ?? []} />
			<WrapperAllMapContent
				places={response.points ?? []}
				isClearMap={response.isClear}
			/>
		</div>
	);
}
