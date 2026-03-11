import { useEffect, useRef } from 'react';

export const useBeforeLeave = (isDirty: boolean, onLeave: () => void) => {
	const onLeaveRef = useRef(onLeave);
	useEffect(() => {
		onLeaveRef.current = onLeave;
	}, [onLeave]);
	// Перехватывает закрытие/обновление вкладки
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isDirty) {
				e.preventDefault();
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [isDirty]);
	// Перехватывает клик по ссылкам Next.js
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (!isDirty) return;
			const anchor = (e.target as HTMLElement).closest('a');
			if (!anchor || anchor.target === '_blank') return;
			const href = anchor.getAttribute('href');
			if (!href || href.startsWith('#')) return;
			e.preventDefault();
			onLeaveRef.current();
		};
		document.addEventListener('click', handleClick, true);
		return () => document.removeEventListener('click', handleClick, true);
	}, [isDirty]);
	// Перехватывает кнопку "назад" браузера
	useEffect(() => {
		if (!isDirty) return; // если не dirty — не добавляем запись и не вешаем обработчик
		window.history.pushState(null, '', window.location.href);
		const handlePopState = () => {
			window.history.pushState(null, '', window.location.href);
			onLeaveRef.current();
		};
		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
			// При размонтировании или isDirty=false — убираем лишнюю запись из истории
			window.history.back();
		};
	}, [isDirty]);
};
