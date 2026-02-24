import { Metadata } from 'next';

import { WrapperAuth } from '@/features/auth';

export const metadata: Metadata = {
	title: 'MOSMAP | Геоаналитика',
	description: 'MosMap-Marker. Программное обеспечение для геоаналитики',
	icons: {
		icon: '/images/icons/logo_mini.svg',
	},
};

export default function ConfirmPage() {
	return <WrapperAuth />;
}
