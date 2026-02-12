import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useSearchAddress } from '../hooks/useSearchAddress';
import { useViewSearchAddressStore } from '../store/searchAddress.store';

import { ListSearch } from './ListSearch';
import { useCenterMapStore } from '@/entities/map';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Input } from '@/shared/ui/fields';

export const SearchAddress: FC = () => {
	const isViewSearch = useViewSearchAddressStore(store => store.isView);
	const toggleView = useViewSearchAddressStore(store => store.toggleView);
	const setCenterMap = useCenterMapStore(store => store.setCenterMap);

	const [search, setSearch] = useState<string>('');
	const [isAnimating, setIsAnimating] = useState(false);

	const searchFromThreeLetters = search.split('').length >= 3 ? search : '';

	const debouncedSearch = useDebounce(searchFromThreeLetters, 300);
	const { data, isLoading, isError, isSuccess } =
		useSearchAddress(debouncedSearch);

	useEffect(() => {
		if (isViewSearch) {
			// Небольшая задержка для trigger анимации
			const timer = setTimeout(() => {
				setIsAnimating(true);
			}, 10);
			return () => clearTimeout(timer);
		} else {
			setIsAnimating(false);
		}
	}, [isViewSearch]);

	//HELP: делаю через эффект, потому что через функцию не сразу срабатывает, приходится повторно нажимать на 1 элемент
	useEffect(() => {
		if (data?.list.length === 1) {
			const crd = data?.list[0].coords;
			setCenterMap(crd);
			toggleView();
			setSearch('');
		}
	}, [data?.list]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSearch = (name: string) => {
		setSearch(name);
	};

	if (!isViewSearch) return null;

	return (
		<div
			className={`absolute top-4 right-1/2 transform transition-transform duration-300 ease-out ${isAnimating ? 'translate-x-1/2' : 'translate-x-[150%]'} z-333334`}
		>
			<Input
				className='bg-white w-3xs '
				placeholder='Введите адрес дома'
				value={search}
				onChange={onChange}
			/>
			{isSuccess && data.list.length > 0 && (
				<ListSearch list={data.list} handleSearch={handleSearch} />
			)}
		</div>
	);
};
