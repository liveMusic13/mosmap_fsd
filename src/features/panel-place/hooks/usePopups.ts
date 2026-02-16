'use client';

import { useEffect, useState } from 'react';

import { useMoveMarkerStore } from '@/entities/place';

export const usePopups = () => {
	const [isPopup, setIsPopup] = useState(false);
	const [isMoveMarker, setIsMoveMarker] = useState(false);
	const [isSaveNewCrdMarker, setIsSaveNewCrdMarker] = useState(false);
	const isMove = useMoveMarkerStore(store => store.isMove);
	const crd = useMoveMarkerStore(store => store.crd);

	useEffect(() => {
		if (!isMove && crd) {
			setIsSaveNewCrdMarker(true);
		}
	}, [crd, isMove]);

	return {
		isPopup,
		setIsPopup,
		isMoveMarker,
		setIsMoveMarker,
		isSaveNewCrdMarker,
		setIsSaveNewCrdMarker,
	};
};
