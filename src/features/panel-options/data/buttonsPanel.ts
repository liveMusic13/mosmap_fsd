import { IPanelData } from '../types';

export const standardArr: IPanelData[] = [
	{
		id: 0,
		src_active: 'database-import',
		hover_text: 'Загрузка данных',
	},
	{
		id: 1,
		src_active: 'database-export',
		hover_text: 'Выгрузка данных',
	},
	{
		id: 2,
		src: 'filter-off',
		src_active: 'filter',
		hover_text: 'Показать/скрыть фильтры',
	},
	{
		id: 3,
		src: 'clipboard-text-off',
		src_active: 'clipboard-text',
		hover_text: 'Показать/скрыть список объектов',
	},
	{
		id: 4,
		src_active: 'text-box-plus',
		hover_text: 'Добавить объект',
	},
	{
		id: 7,
		src_active: 'palete-outline',
		hover_text: 'Закрасить районы',
	},
];

export const settingsArr: IPanelData[] = [
	{
		id: 5,
		src_active: 'gear',
		hover_text: 'Настройка базы данных',
	},
];
