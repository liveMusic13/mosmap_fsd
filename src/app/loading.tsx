import { Loader } from '@/shared/ui/loader';

//TODO: разобраться почему при переходе между страницами не показывается лоадер

export default function Loading() {
	return (
		<div className='min-h-full w-full flex items-center justify-center bg-light-blue '>
			<Loader />
		</div>
	);
}
