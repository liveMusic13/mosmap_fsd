import { Loader } from '@/shared/ui/loader';

export default function Loading() {
	return (
		<div className='min-h-full w-full flex items-center justify-center bg-light-blue '>
			<Loader />
		</div>
	);
}
