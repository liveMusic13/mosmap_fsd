import { TUrl } from '../types/api.types';

export function buildQueryParams(
	urlArg: TUrl,
	searchParams: Record<string, string | string[] | undefined> | URLSearchParams,
	seoUrlOrMap: string,
): string {
	let baseParam = '';

	if (urlArg === 'seo') {
		baseParam = `url=${seoUrlOrMap}`;
	} else {
		baseParam = `map=${seoUrlOrMap}`;
	}

	const urlParams = new URLSearchParams();

	for (const [key, value] of Object.entries(searchParams)) {
		if (!value) continue;

		if (Array.isArray(value)) {
			value.forEach(v => urlParams.append(key, v));
		} else {
			urlParams.append(key, value);
		}
	}

	const queryString = urlParams.toString()
		? `?${baseParam}&${urlParams.toString()}`
		: `?${baseParam}`;

	return queryString;
}

export function getPartAfterMap(str: string): string {
	const marker = '/map/';
	const index = str.indexOf(marker);
	if (index !== -1) {
		return str.substring(index + marker.length);
	}
	return '';
}

export const parseFilterName = (name: string) => {
	const match = name.match(/^([^_]+)_(.+)$/);
	if (!match) return null;
	return { prefix: match[1], id: match[2] };
};

export const buildRangeParams = (
	name: string,
	values: { min: number; max: number },
) => {
	const parsed = parseFilterName(name);
	if (!parsed) return {};

	return {
		[`${parsed.prefix}_from[${parsed.id}]`]: values.min.toString(),
		[`${parsed.prefix}_to[${parsed.id}]`]: values.max.toString(),
	};
};

export const buildListParams = (name: string, value: number) => {
	return {
		[name]: value.toString(),
	};
};

export const buildMapParams = (name: string, selectedIds: number[]) => {
	return {
		[name]: selectedIds.join(','),
	};
};

export const updateUrlParams = (params: Record<string, string>) => {
	const searchParams = new URLSearchParams(window.location.search);

	// Удаляем все старые параметры фильтров
	const keysToDelete: string[] = [];
	searchParams.forEach((_, key) => {
		// Удаляем range фильтры (prefix_from[id], prefix_to[id])
		// list фильтры (prefix[id])
		// и map фильтры (prefix[id])
		if (key.match(/^[^_]+_(from|to)\[/) || key.match(/^[^_]+\[.*\]$/)) {
			keysToDelete.push(key);
		}
	});
	keysToDelete.forEach(key => searchParams.delete(key));

	// Добавляем новые параметры
	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			searchParams.set(key, value);
		}
	});

	const newUrl = `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
	window.history.pushState({}, '', newUrl);
};
