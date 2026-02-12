import { useEffect } from 'react';

export const useTranslateDraw = () => {
	useEffect(() => {
		const L = (window as any).L;

		if (window.L && L.drawLocal) {
			L.drawLocal.draw.toolbar.actions.title = 'Отменить рисование';
			L.drawLocal.draw.toolbar.actions.text = 'Отмена';
			L.drawLocal.draw.toolbar.finish.title = 'Завершить рисование';
			L.drawLocal.draw.toolbar.finish.text = 'Готово';
			L.drawLocal.draw.toolbar.undo.title =
				'Удалить последнюю нарисованную точку';
			L.drawLocal.draw.toolbar.undo.text = 'Отменить';

			L.drawLocal.edit.toolbar.actions.save.title = 'Сохранить изменения';
			L.drawLocal.edit.toolbar.actions.save.text = 'Сохранить';
			L.drawLocal.edit.toolbar.actions.cancel.title = 'Отменить редактирование';
			L.drawLocal.edit.toolbar.actions.cancel.text = 'Отмена';

			L.drawLocal.draw.handlers.polygon.tooltip.start =
				'Нажмите, чтобы начать рисовать область';
			L.drawLocal.draw.handlers.polygon.tooltip.cont =
				'Нажмите, чтобы продолжить рисовать область';
			L.drawLocal.draw.handlers.polygon.tooltip.end =
				'Нажмите первую точку, чтобы завершить область';
		}
	}, []);
};
