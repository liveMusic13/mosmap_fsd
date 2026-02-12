import dynamic from 'next/dynamic';

export * from './store/crd.store';
export * from './ui/AreaDetails';
export { NewPlaceDetails } from './ui/NewPlaceDetails';

export const AreaDetails = dynamic(
	() => import('./ui/AreaDetails').then(mod => mod.AreaDetails),
	{
		ssr: false,
	},
);
export const AreaMarker = dynamic(
	() => import('./ui/AreaMarker').then(mod => mod.AreaMarker),
	{
		ssr: false,
	},
);
