import { Metadata } from 'next';

import { WrapperAuth } from '@/features/auth';

export const metadata: Metadata = {
	title: 'MOSMAP | Геоаналитика',
	description: 'MosMap-Marker. Программное обеспечение для геоаналитики',
	icons: {
		icon: '/images/icons/logo_mini.svg',
	},
};

export default async function RegistrPage() {
	// const cookieStore = await cookies();

	// console.log('cookieStore', cookieStore);

	return <WrapperAuth />;
}
