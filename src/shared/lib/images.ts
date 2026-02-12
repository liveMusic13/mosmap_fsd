// export interface IOptionsData {
// 	id: number;
// 	src?: string;
// 	src_active: string;
// 	hover_text: string;
// }
export const srcStandard = (
	opt: any,
	isListOfObjects: boolean,
	isFilters: boolean
): string => {
	if (opt.id === 2 && !isFilters) {
		return `/images/icons/sprite.svg#${opt.src_active}`;
	} else if (opt.id === 2 && isFilters) {
		return `/images/icons/sprite.svg#${opt.src}`;
	} else if (opt.id === 3 && !isListOfObjects) {
		return `/images/icons/sprite.svg#${opt.src_active}`;
	} else if (opt.id === 3 && isListOfObjects) {
		return `/images/icons/sprite.svg#${opt.src}`;
	} else {
		return `/images/icons/sprite.svg#${opt.src_active}`;
	}
};
